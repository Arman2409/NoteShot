import { StyleSheet } from "react-native";
import variables from "../../../styles/variables";

export default StyleSheet.create({
    main: {
        backgroundColor: variables.colorGreyLight,
        height: "100%",
        width: "100%"
    },
    add_buttons_cont: {
        position: "absolute",
        bottom: 15,
        right: 15
    },
    add_button: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 10,
        paddingTop: 12,
        margin: 5,
        zIndex: 2,
        backgroundColor: variables.colorLight,
        color: variables.colorDark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: variables.buttonBoxShadow,
    }  as any,
    group_button: {
        margin: "0px 5px",
    } as any,
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
    delete_icon: {
        marginTop:3.5,
        color: variables.colorWarning
    },
    member_notes_list: {
        marginLeft: 5,
    },
    member_notes_list_item: {
        backgroundColor: variables.colorLight
    },
})