export type NoteType = {
    id: string,
    date: string,
    title: {
       styles: any
       data: string
    }
    content: {
        styles: any
        data: string
    },
    groupId: string|null
}

export type GroupType = {
    id: string
    name: string
    memberNotes: NoteType[]
}