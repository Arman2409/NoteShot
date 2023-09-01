import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Selector, TextArea, Input, Button, Form, Modal } from "antd-mobile";
import { RxFontItalic } from "react-icons/rx";
import { PiTextUnderlineBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import EmojiSelector from "react-native-emoji-selector";
import { CompactPicker } from "react-color";

import styles from "./assets/styles.ts";
import type { GroupType, NoteType } from "../../types/types";
import { NotesAndStatusContext } from '../../App.tsx';
import generateUniqueId from "../../globals/functions/generateUniqueId.ts";
import EditButtons from "./components/EditButtons/EditButtons.tsx";
import globals from "../../styles/globals.ts";
import useShowNotification from "../../globals/hooks/useShowNotification.tsx";

const styleOptions = [
    { key: '1', label: <PiTextUnderlineBold />, value: "underline" },
    { key: '2', label: <RxFontItalic />, value: "italic" },
]

const Note = ({ navigation }: { navigation: any }) => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [clickedType, setClickedType] = useState<"text" | "title">("text");
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [mode, setMode] = useState<"add" | "edit" | "addToGroup">("add");
    const [showGroup, setShowGroup] = useState<boolean>(false);

    const titleInput = useRef<any>(null);
    const textArea = useRef<any>(null);
    const noteDetails = useRef<any>({ title: { styles: {} }, content: { styles: {} } });

    const { notes, setNotes: setContextNotes, groups, setGroups, currentNote, addingGroupId } = useContext<any>(NotesAndStatusContext);

    const { showNotification } = useShowNotification();

    const addEditNote = useCallback(() => {
        if (!title) {
            Modal.alert({
                content: "Please type title for the note",
                closeOnMaskClick: true,
                confirmText: "Close"
            });
            return;
        }
        if (!content) {
            Modal.alert({
                content: "Please type the note",
                closeOnMaskClick: true,
                confirmText: "Close"
            });
            return;
        }
        if (mode === "edit") {
            const { title: currentTitle, content: currentContent } = currentNote;
            const { data: titleData, styles: titleStyles } = currentTitle;
            const { data: contentData, styles: contentStyles } = currentContent;
            if (title === titleData && content === contentData) {
                // ... Here might be code for checking style changes to allow just routing
                return;
            }
        }
        let notifyText = "";
        if (mode === "add") {
            generateUniqueId(notes, ((id: string) => {
                setContextNotes((notes: NoteType[]) => [
                    {
                        id,
                        date: new Date().toString().slice(4, 15),
                        title: {
                            data: title,
                            styles: noteDetails.current.title.styles
                        },
                        content: {
                            data: content,
                            styles: noteDetails.current.content.styles
                        }
                    },
                    ...notes,
                ])
            }))
            notifyText = "Note added";
        }
        if (mode === "addToGroup") {
            const allMembers = groups.filter(({ id }: GroupType) => id === addingGroupId)[0].memberNotes || [];
            generateUniqueId(allMembers, ((newId: string) => {
                setGroups((groups: GroupType[]) => groups.map((group: GroupType) => {
                    if (group.id === addingGroupId) {
                        const { id, name, memberNotes } = group;
                        return {
                            id,
                            name,
                            memberNotes: [
                                {
                                    id: newId,
                                    groupId: addingGroupId,
                                    date: new Date().toString().slice(4, 15),
                                    title: {
                                        data: title,
                                        styles: noteDetails.current.title.styles
                                    },
                                    content: {
                                        data: content,
                                        styles: noteDetails.current.content.styles
                                    }
                                },
                                ...memberNotes || []
                            ]
                        }
                    }
                    return group;
                }))
            }))
            notifyText = "Note added";
        }
        if (mode === "edit") {
            setContextNotes((notes: NoteType[]) => (
                notes.map((note: NoteType) => {
                    const { id } = note;
                    if (id === currentNote.id) {
                        return ({
                            id,
                            date: new Date().toString().slice(4, 15),
                            title: {
                                data: title,
                                styles: noteDetails.current.title.styles
                            },
                            content: {
                                data: content,
                                styles: noteDetails.current.content.styles
                            }
                        })
                    }
                    return note;
                })
            ))
            notifyText = "Note edited";
        }
        showNotification(notifyText);
        navigation.navigate("Home");
    }, [title, content, groups, addingGroupId, currentNote, noteDetails.current, mode])

    const removeFromGroup = useCallback(() => {
       const {id} = noteDetails.current;
       const groupId = addingGroupId || noteDetails.current.groupId;
    //    Here might be the logice for removing the note from the groups and adding to global notes
    //    setGroups((groups:GroupType) => )
    }, [groups, setGroups, addingGroupId, noteDetails.current])

    const changeProperty = useCallback((property: string, value: string) => {
        if (clickedType === "title") {
            titleInput.current.nativeElement.style[property] = value;
            noteDetails.current = {
                ...noteDetails.current,
                title: {
                    styles: {
                        ...noteDetails.current.title.styles,
                        [property]: value
                    }
                }
            }
        }
        if (clickedType === "text") {
            textArea.current.nativeElement.style[property] = value;
            noteDetails.current = {
                ...noteDetails.current,
                content: {
                    styles: {
                        ...noteDetails.current?.content?.styles,
                        [property]: value
                    },
                }
            }
        }
    }, [textArea, titleInput, noteDetails.current, clickedType])

    const changeStyles = useCallback((selected: string[]) => {
        const added = selected.filter(x => !selectedStyles.includes(x))
        if (added.length) {
            const addedEl = added[0];
            switch (addedEl) {
                case 'italic': changeProperty("fontStyle", "italic");
                    break;
                case 'underline': changeProperty("textDecoration", "underline");
                    break;
            }
        } else {
            const removed = selectedStyles.filter(x => !selected.includes(x))
            if (removed.length) {
                const removedEl = removed[0];
                switch (removedEl) {
                    case 'italic': changeProperty("fontStyle", "normal");
                        break;
                    case 'underline': changeProperty("textDecoration", "none");
                        break;
                }
            }
        }
        setSelectedStyles(selected);
    }, [textArea, selectedStyles, setSelectedStyles, changeProperty])

    const addEmoji = useCallback((emoji: string) => {
        if (clickedType === "text") {
            setContent(current => current + emoji)
        }
        if (clickedType === "title") {
            setTitle(current => current + emoji)
        }
    }, [clickedType, content, title])

    const cancelNote = useCallback(() => {
        if (mode === "add" || mode === "addToGroup") {
            if (title || content) {
                Modal.show({
                    actions: [
                        {
                            key: "cancel",
                            text: "Cancel",
                            style: styles.modal_cancel_button,
                            onClick: () => {
                                navigation.navigate("Home");
                                Modal.clear();
                            }
                        }
                    ],
                    content: "Changes will be lost"
                })
                return;
            }
        }
        if (mode === "edit") {
            const { title: currentTitle, content: currentContent } = currentNote;
            const { data: titleData, styles: titleStyles } = currentTitle;
            const { data: contentData, styles: contentStyles } = currentContent;
            if (title !== titleData || content !== contentData) {
                Modal.show({
                    actions: [
                        {
                            key: "cancel",
                            text: "Cancel",
                            style: styles.modal_cancel_button,
                            onClick: () => {
                                navigation.navigate("Home");
                                Modal.clear();
                            }
                        }
                    ],
                    content: "Changes will be lost"
                })
                return;
            }
        }
        navigation.navigate("Home")
    }, [title, content, currentNote])

    useEffect(() => {
        if (addingGroupId) {
            setMode("addToGroup")
        }
        if (currentNote.groupId || addingGroupId) {
            setShowGroup(true);
        }
        const { title: currentTitle, content: currentContent } = currentNote;
        if (currentTitle?.data) {
            const { data: titleData, styles: titleStyles } = currentTitle;
            const { data: contentData, styles: contentStyles } = currentContent;
            setTitle(titleData);
            setContent(contentData);
            for (let property in titleStyles) {
                titleInput.current.nativeElement.style[property] = titleStyles[property];
            }
            for (let property in contentStyles) {
                textArea.current.nativeElement.style[property] = contentStyles[property];
            }
            setMode("edit");
            noteDetails.current = currentNote;
        }
    }, [currentNote, addingGroupId, setTitle, setContent])

    useEffect(() => {
        navigation.setOptions({
            headerStyle: globals.header
        })
    }, [])

    return (
        <View style={styles.note_main}>
            {showGroup && (
                <Text style={styles.status_cont}>
                    {currentNote.groupId ? `In group: ${groups.filter(({ id }: GroupType) => id === currentNote.groupId)[0].name}` :
                        addingGroupId ? `Adding to group: ${groups.filter(({ id }: GroupType) => id === addingGroupId)[0].name}` : null}
                </Text>)}
            <Modal
                content={
                    <EmojiSelector
                        showSearchBar={false}
                        onEmojiSelected={addEmoji} />
                }
                showCloseButton={true}
                visible={showEmojis}
                onClose={() => setShowEmojis(false)}
            />
            <View style={styles.actions_cont}>
                {showColorPicker &&
                    <View style={styles.color_picker}>
                        <AiOutlineClose
                            size={20}
                            onClick={() => setShowColorPicker(false)}
                            style={styles.color_picker_close_button} />
                        <CompactPicker
                            onChange={({ hex }) => changeProperty("color", hex)}
                        />
                    </View>}
                <Selector
                    options={styleOptions}
                    multiple={true}
                    onChange={changeStyles}
                    showCheckMark={false}
                    style={styles.selector}
                />
                <EditButtons
                    inGroup={showGroup}
                    action={() => {}}
                    setShowEmojis={setShowEmojis}
                    setShowColorPicker={setShowColorPicker} />
            </View>
            <Form layout='horizontal'>
                <Form.Item
                    label='Title'
                    arrow={false}
                    onClick={() => setClickedType("title")}
                >
                    <Input
                        placeholder='Title for the note'
                        clearable
                        value={title}
                        ref={titleInput}
                        onChange={(val: string) => setTitle(val)}
                    />
                </Form.Item>
            </Form>
            <Form layout='horizontal'>
                <Form.Item
                    onClick={() => setClickedType("text")}>
                    <TextArea
                        ref={textArea}
                        value={content}
                        placeholder="Type your Note here"
                        rows={14}
                        onChange={(txt: string) => setContent(txt)}
                    />
                </Form.Item>
            </Form>
            <Button
                block
                color="success"
                style={styles.add_edit_button}
                onClick={addEditNote}>
                {mode === "edit" ? "Edit" : "Add"}
            </Button>
            <Button
                block
                color="warning"
                style={styles.cancel_button}
                onClick={cancelNote}>
                Cancel
            </Button>
        </View >
    )
}

export default Note;