import React, { useCallback } from "react";
import { View } from "react-native";
import { Modal } from "antd-mobile";
import EmojiSelector from "react-native-emoji-selector";

import styles from "./media/emojisStyles";
import type { EmojiPickerProps } from "../../../../types/propTypes";
import type { NoteType } from "../../../../types/types";

const EmojiPicker = ({showEmojis, setShowEmojis, clickedType,
     setTitle, setContent, addEmojiCallback}:EmojiPickerProps) => {

    const addEmoji = useCallback((emoji: string) => { 
        if (clickedType === "content") {
            setContent((current:string) => {
                const newData = current + emoji;
                addEmojiCallback(newData)
                return newData;
            })
        }
        if (clickedType === "title") {
            setTitle((current:string) => {
                const newData = current + emoji;
                addEmojiCallback(newData)
                return newData;
            })
        }    
    }, [clickedType, setTitle, setContent])
   
    return (
        <Modal
        visible={showEmojis}
        content={
            showEmojis && <View style={styles.emojis_cont}>
                <EmojiSelector
                    showSearchBar={false}
                    onEmojiSelected={addEmoji} />
            </View>
        }
        showCloseButton={true}
        onClose={() =>
            setShowEmojis(false)
        }
    />
    )
}

export default EmojiPicker;