import { StyleSheet } from "react-native";
import variables from "../../../styles/variables";

export default StyleSheet.create({
    main: {
        backgroundColor: variables.themeColorGreyLight,
        height: "100%",
        width: "100%"
    },
    add_button: {
        position: "absolute",
        bottom: 0
    },
    title: {
        fontSize: 25,
        color: variables.themeColorGreyDark,
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
        color: "orangered"
    }
})