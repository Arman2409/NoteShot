
import { Grid } from "antd-mobile";
import { LuDelete, LuPaintbrush2 } from "react-icons/lu";
import { AiFillSmile, AiOutlineCaretDown } from "react-icons/ai";

import globalStyles from "../../../../styles/globals";
import styles from "./assests/styles";
import { EditButtonsProps } from "../../../../types/propTypes";

const EditButtons = ({setShowEmojis, setShowColorPicker}:EditButtonsProps) => {
    return (
        <Grid
        columns={4}
        gap={10}
        style={styles.edit_buttons_main}>
        <Grid.Item
            style={{
                ...globalStyles.centered,
                ...styles.action_button
            }}>
            <AiOutlineCaretDown
                style={styles.action_icon}
                size={25} />
        </Grid.Item>
        <Grid.Item
            style={{
                ...globalStyles.centered,
                ...styles.action_button
            }}>
            <LuDelete
                style={styles.action_icon}
                size={25} />
        </Grid.Item>
        <Grid.Item
            style={{
                ...globalStyles.centered,
                ...styles.action_button
            }}
            onClick={() => setShowEmojis((curr:boolean) => !curr)}
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
            onClick={() => setShowColorPicker((curr:boolean) => !curr)}
        >
            <LuPaintbrush2
                style={styles.action_icon}
                size={25} />
        </Grid.Item>
    </Grid>
    )
}

export default EditButtons;