import React from "react";
import Flex from "@ant-design/react-native/lib/flex";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./media/headerButtonsStyles";
import globalStyles from "../../../../styles/globals";
import type { HeaderButtonsProps } from "../../../../types/propTypes";

const HeaderButtons = ({ inGroup, groupAction, setShowPriorityModal }: HeaderButtonsProps) => {
    return (
        <Flex>
            <Flex.Item
                style={{
                    ...globalStyles.centered,
                    ...styles.action_button
                }}
                onClick={groupAction as any}>
                     <Icon
                    name="iso"
                    style={styles.action_icon}
                    size={25} />
            </Flex.Item>
            <Flex.Item
                style={{
                    ...globalStyles.centered,
                    ...styles.action_button
                }}
                onClick={() => setShowPriorityModal()}
            >
                <Icon
                    size={25}
                    name="low-priority"
                    style={styles.action_icon}
                />
            </Flex.Item>
        </Flex>
    )
}

export default HeaderButtons;