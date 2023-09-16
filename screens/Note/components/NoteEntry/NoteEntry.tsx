import { View } from "react-native";
import Input from "@ant-design/react-native/lib/input-item";
import TextArea from "@ant-design/react-native/lib/textarea-item";

import { NoteEntryProps } from "../../../../types/propTypes";

const NoteEntry = ({ 
    title,
    setTitle,
    titleRef,
    content,
    setContent,
    contentRef,
    setClickedType }: NoteEntryProps) => {
    return (
        <>
            <View
             onTouchStart={() => setClickedType("title")}
            >
                    <Input
                        placeholder='Title for the note'
                        value={title}
                        ref={titleRef}
                        onChange={(val: string) => setTitle(val)}
                    />
            </View>
                <View
                    onTouchStart={() => setClickedType("content")}>
                    <TextArea
                        clear
                        ref={contentRef}
                        value={content}
                        placeholder="Type your Note here"
                        rows={12}
                        onChange={(txt: string|undefined) => setContent(txt)}
                    />
                </View>
        </>
    )
}

export default NoteEntry;