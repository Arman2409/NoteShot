import { StyleSheet } from "react-native";

import variables from "../../../styles/variables";

export default StyleSheet.create({
    main: {
        backgroundColor: variables.colorGreyLight,
        height: "100%",
        width: "100%",
    },
    notes_list: {
        overflowY: "auto"
    } as any,
    add_buttons_cont: {
        position: "absolute",
        bottom: 15,
        left: 15,
        zIndex: 4
    },
    add_button: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 5,
        margin: 5,
        backgroundColor: variables.colorLight,
        color: variables.colorDark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: variables.buttonBoxShadow,
    }  as any,
    title: {
        fontSize: 25,
        color: variables.colorGreyDark,
        margin: "auto",
        marginTop: 0,
        marginBottom: 0
    },
    no_notes_text: {
        fontSize: 15,
        margin: "auto",
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: "transparent"
    },
    group_button: {
        marginLeft: "auto",
        marginRight: 3.5,
        marginTop: 3.5,
    },
    add_icon: {
        color: variables.colorDark
    },
    delete_icon: {
        color: variables.colorWarning
    },
    member_notes_list: {
        marginLeft: 10,
    }
})