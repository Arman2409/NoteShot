import React from "react";
import Flex from "@ant-design/react-native/lib/flex";
import { CgFileRemove, CgFileAdd } from "react-icons/cg";
import { MdLowPriority } from "react-icons/md";

import styles from "./media/headerButtonsStyles";
import globalStyles from "../../../../styles/globals";
import type { HeaderButtonsProps } from "../../../../types/propTypes";

const HeaderButtons = ({inGroup, groupAction, setShowPriorityModal}:HeaderButtonsProps) => {
    return (
        <Flex>
            <Flex.Item
                style={{
                    ...globalStyles.centered,
                    ...styles.action_button
                }}>
                {inGroup ? <CgFileRemove
                    style={styles.action_icon}
                    onClick={groupAction as any}
                    size={25} /> :
                    <CgFileAdd
                        size={25}
                        style={styles.action_icon}
                        onClick={groupAction as any}
                    />}
            </Flex.Item>
            <Flex.Item
                style={{
                    ...globalStyles.centered,
                    ...styles.action_button
                }}
                onClick={() => setShowPriorityModal()}
            >
                <MdLowPriority
                    style={styles.action_icon}
                    size={25} />
            </Flex.Item>
        </Flex>
    )
}

export default HeaderButtons;