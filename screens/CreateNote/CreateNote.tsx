import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { Selector, TextArea, Input, Grid, Button, Form, Modal } from "antd-mobile";
import { RxFontItalic } from "react-icons/rx";
import { PiTextUnderlineBold } from "react-icons/pi";
import { AiFillSmile, AiOutlineCaretDown } from "react-icons/ai";
import { LuDelete, LuPaintbrush2 } from "react-icons/lu";
import EmojiSelector from "react-native-emoji-selector";
import { CompactPicker } from "react-color";

import styles from "./assests/styles";

const options = [
    { key: '1', label: <PiTextUnderlineBold />, value: "underline" },
    { key: '2', label: <RxFontItalic />, value: "italic" },
]

const CreateNote = () => {
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [clickedType, setClickedType] = useState<"text" | "title">("text");
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const [showColor, setShowColor] = useState<boolean>(false);

    const titleInput = useRef<any>(null);
    const textArea = useRef<any>(null);

    const addNode = useCallback(() => {
        console.log("add");
        // ....
    }, [])

    const changeProperty = useCallback((property: string, value: string) => {
        if (clickedType === "title") {
            titleInput.current.nativeElement.style[property] = value;
        }
        if (clickedType === "text") {
            textArea.current.nativeElement.style[property] = value;
        }
    }, [textArea, titleInput, clickedType])

    const changeTextStyles = useCallback((selected: string[]) => {
        const added = selected
            .filter(x => !selectedStyles.includes(x))
        if (added.length) {
            const addedEl = added[0];
            switch (addedEl) {
                case 'italic': changeProperty("fontStyle", "italic");
                    break;
                case 'underline': changeProperty("textDecoration", "underline");
                    break;
            }
        } else {
            const removed = selectedStyles
                .filter(x => !selected.includes(x))
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
            setText(current => current + emoji)
        }
        if (clickedType === "title") {
            setTitle(current => current + emoji)
        }
    }, [clickedType, text, title])

    return (
        <View style={{
            height: "100%",
            width: "100%",
            backgroundColor: "green"
        }}>
            {showColor &&
                <CompactPicker
                    onChange={({hex}) => changeProperty("color", hex)}
                />}
            <Modal
                content={
                    <EmojiSelector
                        showSearchBar={false}        
                        onEmojiSelected={addEmoji} />
                }
                showCloseButton={true}
                visible={showEmojis}
                style={{
                    // padding: 35
                }}
                onClose={() => setShowEmojis(false)}
            />
            <Selector
                options={options}
                multiple={true}
                onChange={changeTextStyles}
                showCheckMark={false}
            />
            <Grid
                columns={5}
                gap={10}
                style={{
                    padding: "10px"
                }}>
                <Grid.Item
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        ...styles.action_button
                    }}>
                    <AiOutlineCaretDown size={25} />
                </Grid.Item>
                <Grid.Item
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        ...styles.action_button
                    }}>
                    <LuDelete />
                </Grid.Item>
                <Grid.Item
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        ...styles.action_button
                    }}
                    onClick={() => setShowEmojis(curr => !curr)}
                >
                    <AiFillSmile />
                </Grid.Item>
                <Grid.Item
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        ...styles.action_button
                    }}
                    onClick={() => setShowColor(curr => !curr)}
                >
                    <LuPaintbrush2 size={25} />
                </Grid.Item>
            </Grid>
            <Form layout='horizontal'>
                <Form.Item
                    label='Title'
                    onClick={() => setClickedType("title")}>
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
                        value={text}
                        placeholder="Type your Note here"
                        rows={14}
                        onChange={(txt: string) => setText(txt)}
                    />
                </Form.Item>
            </Form>
            <Button
                block
                color="success"
                style={{
                    position: "absolute",
                    bottom: "50px"
                }}
                onClick={addNode}>
                Add
            </Button>
            <Button
                block
                color="warning"
                style={{
                    position: "absolute",
                    bottom: "0"
                }}
                onClick={() => Modal.alert({
                    onConfirm: () => {},
                    confirmText: "Cancel",
                    content: "This note will be lost"
                })}>
                Cancel
            </Button>
        </View >
    )
}

export default CreateNote;