import React from "react";
import { Grid } from "antd-mobile";
import { CgFileRemove, CgFileAdd } from "react-icons/cg";
import { MdLowPriority } from "react-icons/md";

import styles from "./media/headerButtonsStyles";
import globalStyles from "../../../../styles/globals";
import type { HeaderButtonsProps } from "../../../../types/propTypes";

const HeaderButtons = ({inGroup, groupAction, setShowPriorityModal}:HeaderButtonsProps) => {
    return (
        <Grid columns={2}>
            <Grid.Item
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
            </Grid.Item>
            <Grid.Item
                style={{
                    ...globalStyles.centered,
                    ...styles.action_button
                }}
                onClick={() => setShowPriorityModal()}
            >
                <MdLowPriority
                    style={styles.action_icon}
                    size={25} />
            </Grid.Item>
        </Grid>
    )
}

export default HeaderButtons;