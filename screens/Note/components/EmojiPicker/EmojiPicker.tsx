import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import Modal from "@ant-design/react-native/lib/modal";
import EmojiSelector from "react-native-emoji-selector";

import styles from "./media/emojisStyles";
import type { EmojiPickerProps } from "../../../../types/propTypes";
import { LuDelete } from "react-icons/lu";
import { CgClose } from "react-icons/cg";

const EmojiPicker = ({ showEmojis, setShowEmojis, clickedType,
    setTitle, setContent, addEmojiCallback }: EmojiPickerProps) => {
    const [selectedEmojis, setSelectedEmojis] = useState<string>("");

    const addEmoji = useCallback((emoji: string) => {
        setSelectedEmojis((emojis: string) => emojis + emoji);
        if (clickedType === "content") {
            setContent((current: string) => {
                const newData = current + emoji;
                addEmojiCallback(newData)
                return newData;
            })
        }
        if (clickedType === "title") {
            setTitle((current: string) => {
                const newData = current + emoji;
                addEmojiCallback(newData)
                return newData;
            })
        }
    }, [clickedType, setTitle, setContent, setSelectedEmojis])

    const deleteEmoji = useCallback(() => {
        if (selectedEmojis.length) {
            setSelectedEmojis((emojis: string) => emojis.substring(0, emojis.length - 2))
            if (clickedType === "content") {
                setContent((current: string) => {
                    const newData = current.substring(0, current.length - 2);
                    addEmojiCallback(newData)
                    return newData;
                })
            }
            if (clickedType === "title") {
                setTitle((current: string) => {
                    const newData = current.substring(0, current.length - 2);
                    addEmojiCallback(newData)
                    return newData;
                })
            }
        }
    }, [setSelectedEmojis, selectedEmojis, setContent, setTitle, clickedType])

    return (
        <Modal
            popup
            visible={showEmojis}
            animateAppear={true}
            closable={true}
            maskClosable={true}
            onClose={() => setShowEmojis(false)}
        >
            {showEmojis && <View style={styles.emojis_main}>
                <CgClose 
                  size={20}
                  style={styles.close_button} 
                  onClick={() => setShowEmojis(false)}
                />
                <View style={styles.selected_cont}>
                    <Text>
                        {selectedEmojis}
                    </Text>
                    <LuDelete
                        style={styles.delete_icon}
                        onClick={deleteEmoji}
                    />
                </View>
                <View style={styles.emojis_cont}>
                    <EmojiSelector
                        showSearchBar={false}
                        onEmojiSelected={addEmoji}
                    />
                </View>
            </View>
            }
        </Modal>
    )
}

export default EmojiPicker;