import { Suspense, lazy, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Selector, Button, Modal } from "antd-mobile";
import { RxFontItalic } from "react-icons/rx";
import { PiTextUnderlineBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import EmojiSelector from "react-native-emoji-selector";
import { CompactPicker } from "react-color";

import styles from "./media/noteStyles.ts";
import globalStyles from "../../styles/globals.ts";
import type { GroupType, NoteType } from "../../types/types";
import { NotesAndGroupsContext } from '../../App.tsx';
import generateUniqueId from "../../globals/functions/generateUniqueId.ts";
import useShowNotification from "../../globals/hooks/useShowNotification.tsx";
import { showDelModal } from "../../globals/functions/showDelModal.ts";
import EditButtons from "./components/EditButtons/EditButtons.tsx";
import NoteEntry from "./components/NoteEntry/NoteEntry.tsx";
import variables from "../../styles/variables.ts";
const GroupsModal = lazy(() => import("./components/GroupsModal/GroupsModal.tsx"));
const PriorityModal = lazy(() => import("./components/PriorityModal/PriorityModal.tsx"));

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
    const [showPriorityModal, setShowPriorityModal] = useState<boolean>(false);

    const [showAddToGroupModal, setShowAddToGroupModal] = useState<boolean>(false);

    const titleInput = useRef<any>(null);
    const textArea = useRef<any>(null);
    const noteDetails = useRef<any>({ title: { styles: {} }, content: { styles: {} } });

    const { notes, setNotes, groups, setGroups, currentNote, setCurrentNote, addingGroupId, setAddingGroupId } = useContext<any>(NotesAndGroupsContext);

    const PriorityModalMemo = useMemo(() => <PriorityModal
        visible={showPriorityModal}
        updatePriority={(priority:number) => noteDetails.current = {...noteDetails.current, priority}}
        setVisible={setShowPriorityModal}
    />, [showPriorityModal, setShowPriorityModal, ]);

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
        let notifyText = "";
        const note = noteDetails.current;

        if (mode === "add") {
            generateUniqueId(notes, ((id: string) => {
                setNotes((currents: NoteType[]) => [
                    {
                        id,
                        date: new Date().toString().slice(4, 15),
                        title: {
                            data: title,
                            styles: note.title.styles
                        },
                        content: {
                            data: content,
                            styles: note.content.styles
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
            if (note.groupId) {
                setGroups((groups: GroupType[]) => (
                    groups.map((group: GroupType) => {
                        const { id } = group;
                        if (id === note.groupId) {
                            return ({
                                ...group,
                                memberNotes: group.memberNotes.map((currentNote: NoteType) => {

                                    if (currentNote.id === note.id) {
                                        console.log("found", "editing", {
                                            id: currentNote.id,
                                            date: new Date().toString().slice(4, 15),
                                            title: {
                                                data: title,
                                                styles: note.title.styles
                                            },
                                            content: {
                                                data: content,
                                                styles: note.content.styles
                                            }
                                        });

                                        return ({
                                            id: currentNote.id,
                                            date: new Date().toString().slice(4, 15),
                                            title: {
                                                data: title,
                                                styles: note.title.styles
                                            },
                                            content: {
                                                data: content,
                                                styles: note.content.styles
                                            }
                                        });
                                    }
                                    return note;
                                })
                            })
                        }
                        return group;
                    })
                ))
            } else {
                setNotes((currentNotes: NoteType[]) => (
                    currentNotes.map((currentNote: NoteType) => {
                        const { id } = currentNote;
                        if (id === note.id) {
                            console.log("found editing", {
                                id,
                                date: new Date().toString().slice(4, 15),
                                title: {
                                    data: title,
                                    styles: note.title.styles
                                },
                                content: {
                                    data: content,
                                    styles: note.content.styles
                                }
                            });

                            return ({
                                id,
                                date: new Date().toString().slice(4, 15),
                                title: {
                                    data: title,
                                    styles: note.title.styles
                                },
                                content: {
                                    data: content,
                                    styles: note.content.styles
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
    }, [title, content, setNotes, setGroups, groups, addingGroupId, currentNote, mode])

    const removeFromGroup = useCallback(() => {
        if (mode === "addToGroup") {
            setMode("add");
            setAddingGroupId(null);
        }
        if (mode === "edit") {
            const { id: currentId } = noteDetails.current;
            const removeGroupId = addingGroupId || noteDetails.current.groupId;
            const note = {
                ...noteDetails.current,
                groupId: null
            }
            noteDetails.current = note;
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
                note,
                ...notes
            ]))

        }
    }, [groups, mode, setGroups, setNotes, addingGroupId])

    const addToGroup = useCallback((groupId: string) => {
        if (mode === "add") {
            setMode("addToGroup");
            setAddingGroupId(groupId);
        }
        if (mode === "edit") {
            const note = {
                ...noteDetails.current,
                groupId,
            }
            noteDetails.current = note;
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

    const GroupsModalMemo = useMemo(() => <GroupsModal
        visible={showAddToGroupModal}
        setVisible={setShowAddToGroupModal}
        action={addToGroup}
        groups={groups}
    />, [groups, addToGroup, setShowAddToGroupModal, showAddToGroupModal])

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
        }
    }, [textArea, titleInput, clickedType])

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
        const note = noteDetails.current;
        if (clickedType === "text") {
            setContent(current => {
                const newContent = current + emoji;
                noteDetails.current = {
                    ...note,
                    content: {
                        styles: { ...note.content.styles },
                        data: newContent
                    }
                }
                return newContent;
            });
        }
        if (clickedType === "title") {
            setTitle(current => {
                const newTitle = current + emoji;
                noteDetails.current = {
                    ...note,
                    title: {
                        styles: { ...note.title.styles },
                        data: newTitle
                    }
                }
                return newTitle;
            });
        }
    }, [clickedType, setTitle, setContent])

    const cancelNote = useCallback(() => {
        if (mode === "add" || mode === "addToGroup") {
            if (title || content) {
                Modal.show({
                    actions: [
                        {
                            key: "cancel",
                            text: "Cancel",
                            style: globalStyles.modal_cancel_button,
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
                            style: globalStyles.modal_cancel_button,
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
            }).name || "";
        }
        return groups.find(({ id }: GroupType) => {
            return id === noteDetails.current.groupId
        }).name || "";
    }, [addingGroupId, groups])

    useLayoutEffect(() => {
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
    }, [currentNote, addingGroupId, setMode, setTitle, setContent])

    useEffect(() => {
        navigation.setOptions({
            headerStyle: globalStyles.header
        })
    }, [noteDetails.current])


    return (
        <View style={styles.note_main}>
            {showGroupStatus && (
                <Text style={styles.status_cont}>
                    {currentNote.groupId ? `In group: ${groups.filter(({ id }: GroupType) => id === currentNote.groupId)[0].name}` :
                        addingGroupId ? `Adding to group: ${groups.filter(({ id }: GroupType) => id === addingGroupId)[0].name}` : null}
                </Text>)}
            <Modal
                content={
                    showEmojis && <div style={styles.emojis_cont}>
                        <EmojiSelector
                            showSearchBar={false}
                            onEmojiSelected={addEmoji} />
                    </div>
                }
                showCloseButton={true}
                visible={showEmojis}
                onClose={() =>
                    setShowEmojis(false)
                }
            />
            <Suspense fallback="Loading...">
                {PriorityModalMemo}
                {GroupsModalMemo}
            </Suspense>
            <View style={styles.actions_cont}>
                {showColorPicker &&
                    <View style={styles.color_picker_cont}>
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
                    style={{
                        ...styles.selector,
                        "--color": variables.colorDark,
                        "--checked-color": variables.colorDark,
                        "--text-color": variables.colorLight,
                        "--checked-text-color": variables.colorLight,
                    }}
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
                    setShowPriorityModal={setShowPriorityModal}
                    setShowEmojis={setShowEmojis}
                    setShowColorPicker={setShowColorPicker}
                />
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