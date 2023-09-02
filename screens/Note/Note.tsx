import { Suspense, lazy, useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Selector, Button, Modal } from "antd-mobile";
import { RxFontItalic } from "react-icons/rx";
import { PiTextUnderlineBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import EmojiSelector from "react-native-emoji-selector";
import { CompactPicker } from "react-color";

import styles from "./assets/styles.ts";
import globalStyles from "../../styles/globals.ts";
import type { GroupType, NoteType } from "../../types/types";
import { NotesAndGroupsContext } from '../../App.tsx';
import generateUniqueId from "../../globals/functions/generateUniqueId.ts";
import useShowNotification from "../../globals/hooks/useShowNotification.tsx";
import { showDelModal } from "../../globals/functions/showDelModal.ts";
import EditButtons from "./components/EditButtons/EditButtons.tsx";
import NoteEntry from "./components/NoteEntry/NoteEntry.tsx";
const GroupsModal = lazy(() => import("./components/GroupsModal/GroupsModal.tsx"));

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
    const [showGroupStatus, setShowGroupStatus] = useState<boolean>(false);
    const [showAddToGroupModal, setShowAddToGroupModal] = useState<boolean>(false);

    const titleInput = useRef<any>(null);
    const textArea = useRef<any>(null);
    const noteDetails = useRef<any>({ title: { styles: {} }, content: { styles: {} } });

    const { notes, setNotes, groups, setGroups, currentNote, setCurrentNote, addingGroupId, setAddingGroupId } = useContext<any>(NotesAndGroupsContext);

    const { showNotification } = useShowNotification();

    const addEditNote = useCallback(() => {
        if (!title) {
            Modal.alert({
                content: "Please type title for the note",
                closeOnMaskClick: true,
                confirmText: "Close",
                showCloseButton: true
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
        // if (mode === "edit") {
        //     const { title: currentTitle, content: currentContent } = currentNote;
        //     const { data: titleData, styles: titleStyles } = currentTitle;
        //     const { data: contentData, styles: contentStyles } = currentContent;
        //     if (title === titleData && content === contentData) {
        //         // ... Here might be code for checking style changes to allow just routing
        //         return;
        //     }
        // }
        let notifyText = "";
        if (mode === "add") {
            generateUniqueId(notes, ((id: string) => {
                setNotes((currents: NoteType[]) => [
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
                    ...currents,
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
            if (noteDetails.current.groupId) {
                setGroups((groups: GroupType[]) => (
                    groups.map((group: GroupType) => {
                        const { id } = group;
                        if (id === noteDetails.current.groupId) {
                            return ({
                                ...group,
                                memberNotes: group.memberNotes.map((note: NoteType) => ({
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
                                }))
                            })
                        }
                        return group;
                    })
                ))
            } else {
                setNotes((notes: NoteType[]) => (
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
            }
            notifyText = "Note edited";
        }
        showNotification(notifyText);
        navigation.navigate("Home");
    }, [title, content, setNotes, setGroups, groups, addingGroupId, currentNote, noteDetails.current, mode])

    const removeFromGroup = useCallback(() => {
        if (mode === "addToGroup") {
            setMode("add");
            setAddingGroupId(null);
        }
        if (mode === "edit") {
            const { id: currentId } = noteDetails.current;
            const removeGroupId = addingGroupId || noteDetails.current.groupId;
            setCurrentNote((current: NoteType) => {
                noteDetails.current = {
                    ...current,
                    groupId: null
                };
                return ({
                    ...current,
                    groupId: null
                })
            }
            )
            setGroups((groups: GroupType[]) => groups.map((group: GroupType) => {
                if (group.id === removeGroupId) {
                    return ({
                        ...group,
                        memberNotes: group.memberNotes.filter(({ id }) => id !== currentId)
                    })
                }
                return group;
            }))
            setNotes((notes: NoteType[]) => ([
                noteDetails.current,
                ...notes
            ]))

        }
    }, [groups, mode, setGroups, setNotes, addingGroupId, noteDetails.current])

    const addToGroup = useCallback((groupId: string) => {
        if (mode === "add") {
            setMode("addToGroup");
            setAddingGroupId(groupId);
        }
        if (mode === "edit") {
            let note: NoteType;
            setCurrentNote((current: NoteType) => {
                note = {
                    ...current,
                    groupId
                };
                noteDetails.current = note;
                return note;
            })
            setGroups((groups: GroupType[]) => groups.map((group: GroupType) => {
                if (group.id === groupId) {
                    return ({
                        ...group,
                        memberNotes: [
                            ...group.memberNotes,
                            note
                        ]
                    })
                }
                return group;
            }))
            setNotes((notes: NoteType[]) => notes.filter(({ id }: NoteType) => id !== noteDetails.current.id))
        }

    }, [mode, setGroups, setNotes, setCurrentNote])

    const changeProperty = useCallback((property: string, value: string) => {
        if (clickedType === "title") {
            titleInput.current.nativeElement.style[property] = value;
            noteDetails.current = {
                ...noteDetails.current,
                title: {
                    data: noteDetails.current.title.data,
                    styles: {
                        ...noteDetails.current.title.styles,
                        [property]: value
                    }
                }
            }
            setCurrentNote(noteDetails.current);
        }
        if (clickedType === "text") {
            textArea.current.nativeElement.style[property] = value;
            noteDetails.current = {
                ...noteDetails.current,
                content: {
                    data: noteDetails.current.content.data,
                    styles: {
                        ...noteDetails.current?.content?.styles,
                        [property]: value
                    },
                }
            }
            setCurrentNote(noteDetails.current);
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

    const getGroupName = useCallback(() => {
        if (addingGroupId) {
            return groups.find(({ id }: GroupType) => {
                return id === addingGroupId
            })[0].name || "";
        }
        return groups.find(({ id }: GroupType) => {
            return id === noteDetails.current.groupId
        })[0].name || "";
    }, [addingGroupId, noteDetails.current, groups])

    useEffect(() => {
        if (addingGroupId) {
            setMode("addToGroup");
        }
        if (currentNote.groupId || addingGroupId) {
            setShowGroupStatus(true);
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
    }, [currentNote, noteDetails.current, addingGroupId, setMode, setTitle, setContent])

    useEffect(() => {
        navigation.setOptions({
            headerStyle: globalStyles.header
        })
    }, [])

    return (
        <View style={styles.note_main}>
            {showGroupStatus && (
                <Text style={styles.status_cont}>
                    {currentNote.groupId ? `In group: ${groups.filter(({ id }: GroupType) => id === currentNote.groupId)[0].name}` :
                        addingGroupId ? `Adding to group: ${groups.filter(({ id }: GroupType) => id === addingGroupId)[0].name}` : null}
                </Text>)}
            <Modal
                content={
                    <div style={styles.emojis_cont}>
                        <EmojiSelector
                            showSearchBar={false}
                            onEmojiSelected={addEmoji} />
                    </div>
                }
                showCloseButton={true}
                visible={showEmojis}
                onClose={() => setShowEmojis(false)}
            />
            <Suspense fallback="...">
                <GroupsModal
                    visible={showAddToGroupModal}
                    setVisible={setShowAddToGroupModal}
                    action={addToGroup}
                    groups={groups}
                />
            </Suspense>
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
                    inGroup={showGroupStatus}
                    groupAction={() => {
                        if (showGroupStatus) {
                            showDelModal(`Remove from the group ${getGroupName()}`, removeFromGroup, "Remove")
                            return;
                        }
                        setShowAddToGroupModal(true);
                    }}
                    setShowEmojis={setShowEmojis}
                    setShowColorPicker={setShowColorPicker} />
            </View>
            <NoteEntry
                title={title}
                setTitle={setTitle}
                titleRef={titleInput}
                content={content}
                setContent={setContent}
                contentRef={textArea}
                setClickedType={setClickedType}
            />
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