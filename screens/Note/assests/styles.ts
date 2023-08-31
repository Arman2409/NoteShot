import { StyleSheet } from "react-native";
import variables from "../../../styles/variables";

export default StyleSheet.create({
    note_main: {
        height: "100%",
        width: "100%",
        backgroundColor: variables.colorLight
    },
    actions_cont: {
       width: "100%",
       paddingVertical: 5,
       backgroundColor: variables.colorGreyLight,
    },
    selector: {
       margin: "auto",
    },
    action_button: {
        width: 40,
        height: 40,
        backgroundColor: variables.colorDark,
        borderRadius: 10
    },
    action_icon: {
        color: variables.colorGreyLight
    },
    color_picker: {
        position: "absolute",
        zIndex: 2,
        backgroundColor: "white",
    },
    color_picker_close_button: {
        marginLeft: "auto"
    },
    add_edit_button: {
        position: "absolute",
        bottom: 50
    },
    cancel_button: {
        position: "absolute",
        bottom: 0
    },
    modal_cancel_button: {
        backgroundColor: variables.colorWarning
    }
})