import React, { useCallback, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./media/styleOptions";
import globalStyles from "../../../../styles/globals";
import type { StyleOptionsProps } from "../../../../types/propTypes";

const styleOptions = [
    { key: '1', label: <Icon name="format-underline" size={20} />, value: "underline" },
    { key: '2', label: <Icon name="format-italic" size={20} />, value: "italic" },
]

const StyleOptions = ({ actionFunction }: StyleOptionsProps) => {
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

    const handleChange = useCallback((changedStyle: string) => {
        setSelectedStyles((curr: string[]) => {
            if (curr.includes(changedStyle)) {
                return curr.filter(item => item !== changedStyle);
            }
            return [...curr, changedStyle];
        })
        actionFunction(selectedStyles)
    }, [setSelectedStyles, selectedStyles])

    return (
        <View style={{
            ...styles.main,
            ...globalStyles.centered
        }}>
            {styleOptions.map(({ key, label, value }) => {
                return (
                    <View
                        key={key}
                        style={{
                            ...styles.item,
                            ...globalStyles.centered
                        }}
                        onTouchStart={() => handleChange(value)}
                    >
                        {label}
                    </View>
                )
            })}
        </View>
    )
}

export default StyleOptions;