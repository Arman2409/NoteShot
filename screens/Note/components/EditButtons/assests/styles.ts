import { StyleSheet } from "react-native";
import variables from "../../../../../styles/variables";

export default StyleSheet.create({
    action_button: {
        width: 40,
        height: 40,
        backgroundColor: variables.colorGreyDark,
        borderRadius: 10
    },
    action_icon: {
        color: variables.colorGreyLight
    },
    edit_buttons_main: {
        width: "60%",
        padding: 10,
        margin: "auto",
        marginBottom: 0,
        marginTop: 0
    }
})