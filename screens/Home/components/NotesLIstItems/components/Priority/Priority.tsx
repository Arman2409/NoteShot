import React from "react";
import { View } from "react-native";

import styles from "./media/priorityStyles";
import type { PriorityProps } from "../../../../../../types/propTypes";

const Priority = ({ priority }: PriorityProps) => {
    priority = (Number.isInteger(priority) ? priority : 1) as number;

    return (
        <View
            style={{
                ...styles.main,
                background: `linear-gradient(to right,green ${priority * 20}%, red 0%)`
            } as any}
        />
    )
}
export default Priority;