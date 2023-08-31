import { StyleSheet } from "react-native";

import variables from "../../../../../styles/variables";

export default StyleSheet.create({
    add_button: {
        backgroundColor: variables.colorSuccess,
        color: variables.colorLight,
        marginBottom: 15
    },
    cancel_button: {
        backgroundColor: variables.colorWarning,
        color: variables.colorLight,
    },
    add_input: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: variables.colorGreyLight,
        color: variables.colorGreyDark
    }
})