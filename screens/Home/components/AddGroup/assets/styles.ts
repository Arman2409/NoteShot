import { StyleSheet } from "react-native";

import variables from "../../../../../styles/variables";

export default StyleSheet.create({
    add_button: {
        backgroundColor: variables.colorSuccess,
        color: variables.colorLight,
        height: 25
    },
    cancel_button: {
        backgroundColor: variables.colorWarning,
        color: variables.colorLight,
        height: 25
    },
})