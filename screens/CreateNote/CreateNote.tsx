import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Selector, TextArea, Input, Grid, Space, Button, Form, AutoCenter } from "antd-mobile";
import { RxFontItalic } from "react-icons/rx";
import { PiTextUnderlineBold } from "react-icons/pi";
import { AiOutlineCaretDown } from "react-icons/ai";
import { LuDelete } from "react-icons/lu";
// import EmojiSelector from "reac"

import styles from "./assests/styles";

const options = [
    { key: '1', label: <PiTextUnderlineBold />, value: "underline" },
    { key: '2', label: <RxFontItalic />, value: "italic" }
]

const CreateNote = () => {
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [italic, setItalic] = useState<boolean>(false);
    const [underline, setUnderline] = useState<boolean>(false);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

    const addNode = useCallback(() => {
        console.log("add");

    }, [])

    const changeTextStyles = useCallback((selected: string[]) => {
        const added = selected
        .filter(x => !selectedStyles.includes(x))
        if(added.length) {
            const addedEl = added[0];
            switch (addedEl) {
               case 'italic': setItalic(true);
               case 'underline': setUnderline(true);
            }
        } else {
            const removed = selectedStyles
            .filter(x => !selected.includes(x))
            if(removed.length) {
                const removedEl = removed[0];                
                switch (removedEl) {
                   case 'italic': setItalic(false);
                   case 'underline': setUnderline(false);
                }
            }
        }
       setSelectedStyles(selected);
    }, [setItalic, setUnderline, selectedStyles, setSelectedStyles])

    useEffect(() => {
       console.log(italic);
       
    }, [italic])
    return (
        <View style={{
            height: "100%",
            width: "100%",
            backgroundColor: "green"
        }}>
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
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red"
                  }}>
                <AiOutlineCaretDown size={25} />

                </Grid.Item>
                <Grid.Item
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red"
                  }}>
                  <LuDelete />
                </Grid.Item>
            </Grid>
            <Form layout='horizontal'>
                <Form.Item label='Title'>
                    <Input
                        placeholder='Title for the note'
                        clearable
                        value={title}
                        onChange={(val: string) => setTitle(val)}
                    />
                </Form.Item>
            </Form>
            <Form layout='horizontal'>
                <Form.Item>
                     <TextArea
                        value={text}
                        placeholder="Type your Note here"
                        rows={15}
                        style={{
                            color: "red",
                            fontStyle: italic ? "italic" : "normal"
                        }}
                        onChange={(txt: string) => setText(txt)}
                    />
                </Form.Item>
            </Form>
            <Button
                block
                color="success"
                style={{
                    position:"absolute",
                    bottom: "0"
                }}
                onClick={addNode}>
                Add
            </Button>
        </View >
    )
}

export default CreateNote;