import { StyleSheet } from "react-native";

import variables from "../../../styles/variables";

export const deleteModalStyles = StyleSheet.create({
    delete_button: {
        backgroundColor: variables.colorWarning,
        color: variables.colorLight,
     },
     cancel_button : {
         backgroundColor: variables.colorSuccess,
         color: variables.colorLight,
     },
})