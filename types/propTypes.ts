import { Ref } from "react";

import type { NoteType } from "./types";

export type EditButtonsProps = {
    setShowEmojis: Function
    setShowColorPicker: Function
}

export type ModalProps = {
    visible: boolean,
    setVisible: Function
}

export type NoteEntryProps = {
    title: string
    titleRef: Ref<any>
    content: string
    contentRef: Ref<any>
    setClickedType: Function
    setContent: Function
    setTitle: Function
}

export type DemoWarningProps = {
    warning: string
}

export type NotesListProps = {
    areMembers: boolean
    groupId?: string
    notes: NoteType[]
    editNote: Function
    remove: Function,
}

export type HeaderButtonsProps = {
    inGroup: Boolean
    groupAction: Function
    setShowPriorityModal: Function
}

export type PriorityProps = {
    priority: number | null | undefined
}

export type EmojiPickerProps = {
    showEmojis: boolean
    clickedType: string
    setShowEmojis: Function
    setTitle: Function
    setContent: Function
    addEmojiCallback: Function
}

export type StyleOptionsProps= {
    actionFunction: Function
}