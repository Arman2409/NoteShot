import { Ref } from "react";

import type { NoteType } from "./types";

export type EditButtonsProps = {
    setShowEmojis:Function
    setShowColorPicker:Function
}

export type ModalProps = {
    visible: boolean,
    setVisible: Function
}

export type NoteEntryProps = {
    title: string
    setTitle: Function,
    titleRef: Ref<any>
    content: string
    setContent: Function
    contentRef: Ref<any>
    setClickedType: Function
}

export type DemoWarningProps = {
    warning: string
}

export type NotesListProps = {
    areMembers: boolean
    notes: NoteType[]
    editNote: Function
    remove: Function,
    groupId?: string
}

export type HeaderButtonsProps = {
    inGroup: Boolean
    groupAction: Function
    setShowPriorityModal: Function
}

export type PriorityProps = {
    priority: number|null|undefined
}