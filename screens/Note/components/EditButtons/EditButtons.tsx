
import Flex from "@ant-design/react-native/lib/flex";
import { LuPaintbrush2 } from "react-icons/lu";
import { AiFillSmile } from "react-icons/ai";

import globalStyles from "../../../../styles/globals";
import styles from "./media/editButtonsStyles";
import type { EditButtonsProps } from "../../../../types/propTypes";

const EditButtons = ({ setShowEmojis, setShowColorPicker }: EditButtonsProps) => (
    <Flex
        justify="center"
        style={styles.edit_buttons_main}>
        <Flex.Item
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
        </Flex.Item>
        <Flex.Item
            style={{
                ...globalStyles.centered,
                ...styles.action_button
            }}
            onClick={() => setShowColorPicker((curr: boolean) => !curr)}
        >
            <LuPaintbrush2
                style={styles.action_icon}
                size={25} />
        </Flex.Item>
    </Flex>
)

export default EditButtons;