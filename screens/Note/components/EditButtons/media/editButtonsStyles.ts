import { StyleSheet } from "react-native";
import variables from "../../../../../styles/variables";

export default StyleSheet.create({
    edit_buttons_main: {
        width: "auto",
        padding: 10,
        margin: "auto",
        marginBottom: 0,
        marginTop: 0
    },
    action_button: {
        width: 40,
        height: 40,
        backgroundColor: variables.colorGreyDark,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    action_icon: {
        color: variables.colorLight
    },
})