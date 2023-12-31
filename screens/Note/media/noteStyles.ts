import { StyleSheet } from "react-native";

import variables from "../../../styles/variables";

export default StyleSheet.create({
    note_main: {
        height: "100%",
        width: "100%",
        backgroundColor: variables.colorLight,
    },
    actions_cont: {
        width: "100%",
        backgroundColor: variables.colorGreyLight,
        position: "relative",
    },
    selector: {
        margin: "auto",
        marginTop: 5
    },
    status_cont: {
        backgroundColor: variables.colorDark,
        color: variables.colorLight,
        textAlign: "right"
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
    color_picker_cont: {
        position: "absolute",
        zIndex: 2,
        backgroundColor: "white",
        width: "100%",
        height: "auto",
    },
    color_picker_close_button: {
        position: "absolute",
        top: 5,
        right: 5,
        zIndex: 2,
    },
    add_edit_button: {
        position: "absolute",
        bottom: 50,
        backgroundColor: variables.colorSuccess
    },
    cancel_button: {
        position: "absolute",
        bottom: 0
    }
})