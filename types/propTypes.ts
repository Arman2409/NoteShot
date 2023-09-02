import { Ref } from "react"

export type EditButtonsProps = {
    inGroup: Boolean
    groupAction: Function
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