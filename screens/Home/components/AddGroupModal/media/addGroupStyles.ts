import { StyleSheet } from "react-native";

import variables from "../../../../../styles/variables";

export default StyleSheet.create({
    modal_main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 230
    },
    add_input: {
        borderWidth: 0.5,
        borderStyle: "solid",
        height: 45,
        borderColor: variables.colorGreyLight,
        color: variables.colorGreyDark,
        marginVertical: 10,
        marginBottom: 5
    },
    add_button: {
        marginVertical: 10
    }
})