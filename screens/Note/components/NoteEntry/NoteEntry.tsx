import { Form, Input, TextArea } from "antd-mobile"
import { NoteEntryProps } from "../../../../types/propTypes";

const NoteEntry = ({ title,
    setTitle,
    titleRef,
    content,
    setContent,
    contentRef,
    setClickedType }: NoteEntryProps) => {
    return (
        <>
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
                        ref={titleRef}
                        onChange={(val: string) => setTitle(val)}
                    />
                </Form.Item>
            </Form>
            <Form layout='horizontal'>
                <Form.Item
                    arrow={false}
                    onClick={() => setClickedType("content")}>
                    <TextArea
                        ref={contentRef}
                        value={content}
                        placeholder="Type your Note here"
                        rows={12}
                        onChange={(txt: string) => setContent(txt)}
                    />
                </Form.Item>
            </Form>
        </>
    )
}

export default NoteEntry;