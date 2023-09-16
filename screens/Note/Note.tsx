import React, { Suspense, lazy, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { View, Text } from "react-native";
import Button from "@ant-design/react-native/lib/button";
import Modal from "@ant-design/react-native/lib/modal";
import { AiOutlineClose } from "react-icons/ai";
import { CompactPicker } from "react-color";

import styles from "./media/noteStyles.ts";
import globalStyles from "../../styles/globals.ts";
import type { GroupType, NoteType } from "../../types/types";
import { NotesAndGroupsContext } from '../../App.tsx';
import generateUniqueId from "../../globals/functions/generateUniqueId.ts";
import useShowNotification from "../../globals/hooks/useShowNotification.tsx";
import { showDelModal } from "../../globals/functions/showDelModal.ts";
import EditButtons from "./components/EditButtons/EditButtons.tsx";
import HeaderButtons from "./components/HeaderButtons/HeaderButtons.tsx";
import NoteEntry from "./components/NoteEntry/NoteEntry.tsx";
import EmojiPicker from "./components/EmojiPicker/EmojiPicker.tsx";
import StyleOptions from "./components/StyleOptions/StyleOptions.tsx";
const GroupsModal = lazy(() => import("./components/GroupsModal/GroupsModal.tsx"));
const PriorityModal = lazy(() => import("./components/PriorityModal/PriorityModal.tsx"));



const Note = ({ navigation }: { navigation: any }) => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [clickedType, setClickedType] = useState<"content" | "title">("content");
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

    const { showNotification } = useShowNotification();

    const updatePriority = useCallback((priority: number) => {
        const note = { ...noteDetails.current, priority }
        noteDetails.current = note;
        setCurrentNote(note);
        setShowPriorityModal(false);
        if (mode === "add") return;
        if (note.groupId) {
            setGroups((groups: GroupType[]) => groups.map((group: GroupType) => {
                const { id } = group;
                if (id === note.groupId) {
                    const { memberNotes } = group;
                    return {
                        ...group,
                        memberNotes: memberNotes.map((member: NoteType) => {
                            if (member.id === note.id) {
                                return {
                                    ...member,
                                    priority
                                }
                            }
                            return member;
                        })
                    }
                }
                return group;
            }))
            return;
        }
        setNotes((notes: NoteType[]) => notes.map((note: NoteType) => {
            const { id } = note;
            if (id === currentNote.id) return {
                ...note,
                priority
            }
            return note;
        }))
    }, [setCurrentNote, setNotes, setShowPriorityModal])

    const PriorityModalMemo = useMemo(() => <PriorityModal
        visible={showPriorityModal}
        updatePriority={updatePriority}
        defaultValue={noteDetails.current.priority}
        setVisible={setShowPriorityModal}
    />, [showPriorityModal, setShowPriorityModal, updatePriority]);

    const addEditNote = useCallback(() => {
        if (!title) {
            Modal.alert( "Please type title for the note",
                "",
                [
                    { text: "Close", onPress: () => { } }
                ]
            );
            return;
        }
        if (!content) {
            Modal.alert( "Please type the note",
                "",
                [
                    { text: "Close", onPress: () => { } }
                ]
            );
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
                        },
                        priority: noteDetails.current.priority || 1,
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
                                    },
                                    priority: 1
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

                                        return ({
                                            ...noteDetails.current,
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
                            return ({
                                ...noteDetails.current,
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

    const addEmojiCallback = useCallback((newData: string) => {
        if (clickedType === "content") {
            noteDetails.current = {
                ...noteDetails.current,
                content: {
                    ...noteDetails.current.content,
                    data: newData,
                }
            }
        }
        if (clickedType === "title") {
            noteDetails.current = {
                ...noteDetails.current,
                title: {
                    ...noteDetails.current.title,
                    data: newData,
                }
            }
        }
    }, [clickedType])

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
        setShowGroupStatus(false);
    }, [groups, mode, setGroups, setNotes, addingGroupId])

    const addToGroup = useCallback((groupId: string) => {
        if (mode === "add") {
            setMode("addToGroup");
            setAddingGroupId(groupId);
            setShowGroupStatus(true);
        }
        if (mode === "edit") {
            const note = {
                ...noteDetails.current,
                groupId,
            }
            noteDetails.current = note;
            setCurrentNote(note);
            console.log(note);

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
            setShowGroupStatus(true);
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
            titleInput.current.inputRef.inputRef.style[property] = value;
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
        if (clickedType === "content") {
            textArea.current.textAreaRef.style[property] = value;
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

    const cancelNote = useCallback(() => {
        if (mode === "add" || mode === "addToGroup") {
            if (title || content) {
                Modal.alert("Changes will be lost",
                    "",
                    [
                        {
                            text: "Continue",
                            style: globalStyles.modal_cancel_button,
                            onPress: () => {
                                navigation.navigate("Home");
                            }
                        }
                    ]
                )
                return;
            }
        }
        if (mode === "edit") {
            const { title: currentTitle, content: currentContent } = currentNote;
            const { data: titleData, styles: titleStyles } = currentTitle;
            const { data: contentData, styles: contentStyles } = currentContent;
            if (title !== titleData || content !== contentData) {
                Modal.alert( "Changes will be lost",
                    "",
                    [
                        {
                            text: "Continue",
                            style: globalStyles.modal_cancel_button,
                            onPress: () => {
                                navigation.navigate("Home");
                            }
                        }
                    ],
                )
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
            for (let property in titleStyles) {
                titleInput.current.inputRef.inputRef.style[property] = titleStyles[property];
            }
            for (let property in contentStyles) {
                textArea.current.textAreaRef.style[property] = contentStyles[property];
            }
            setTitle(titleData)
            setContent(contentData)
            setMode("edit")
            noteDetails.current = currentNote;
        }
    }, [currentNote, addingGroupId, setMode, setTitle, setContent])

    useEffect(() => {
        navigation.setOptions({
            headerStyle: globalStyles.header,
            headerRight: () => <HeaderButtons
                inGroup={showGroupStatus}
                groupAction={() => {
                    if (showAddToGroupModal) {
                        setShowAddToGroupModal(false);
                        return;
                    }
                    if (showGroupStatus) {
                        showDelModal(`Remove from the group ${getGroupName()}`, removeFromGroup, "Remove")
                        return;
                    }
                    if (showPriorityModal) setShowPriorityModal(false);
                    setShowAddToGroupModal(true);
                }}
                setShowPriorityModal={() => {
                    if (showAddToGroupModal) setShowAddToGroupModal(false);
                    setShowPriorityModal(current => !current);
                }} />
        })
    }, [showGroupStatus, showPriorityModal, showAddToGroupModal, setShowPriorityModal, setShowAddToGroupModal])

    return (
        <View style={styles.note_main}>
            {showGroupStatus && (
                <Text style={styles.status_cont}>
                    {currentNote.groupId ? `In group: ${groups.filter(({ id }: GroupType) => id === currentNote.groupId)[0].name}` :
                        addingGroupId ? `Adding to group: ${groups.filter(({ id }: GroupType) => id === addingGroupId)[0].name}` : null}
                </Text>)}
            <EmojiPicker
                setTitle={setTitle}
                setContent={setContent}
                showEmojis={showEmojis}
                setShowEmojis={setShowEmojis}
                clickedType={clickedType}
                addEmojiCallback={addEmojiCallback}
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
                <StyleOptions actionFunction={changeStyles}/>
                <EditButtons
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
                style={styles.add_edit_button}
                onPress={addEditNote}>
                {mode === "edit" ? "Edit" : "Add"}
            </Button>
            <Button
                style={styles.cancel_button}
                onPress={cancelNote}>
                Cancel
            </Button>
        </View >
    )
}

export default Note;