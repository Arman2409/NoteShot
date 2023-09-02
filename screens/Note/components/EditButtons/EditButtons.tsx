
import { Grid } from "antd-mobile";
import { LuDelete, LuPaintbrush2 } from "react-icons/lu";
import { AiFillSmile } from "react-icons/ai";
import { CgFileRemove, CgFileAdd } from "react-icons/cg";

import globalStyles from "../../../../styles/globals";
import styles from "./assets/styles";
import type { EditButtonsProps } from "../../../../types/propTypes";

const EditButtons = ({ inGroup, groupAction, setShowEmojis, setShowColorPicker }: EditButtonsProps) => {
    return (
        <Grid
            columns={3}
            gap={10}
            style={styles.edit_buttons_main}>
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
                onClick={() => setShowEmojis((curr: boolean) => !curr)}
            >
                <AiFillSmile
                    style={styles.action_icon}
                    size={25}
                />
            </Grid.Item>
            <Grid.Item
                style={{
                    ...globalStyles.centered,
                    ...styles.action_button
                }}
                onClick={() => setShowColorPicker((curr: boolean) => !curr)}
            >
                <LuPaintbrush2
                    style={styles.action_icon}
                    size={25} />
            </Grid.Item>
        </Grid>
    )
}

export default EditButtons;