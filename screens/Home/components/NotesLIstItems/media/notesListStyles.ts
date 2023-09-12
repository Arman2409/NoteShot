import { StyleSheet, View } from "react-native";

import variables from "../../../../../styles/variables";

export default StyleSheet.create({
    member_notes_list_item: {
        backgroundColor: variables.colorLight
    },
    date: {
       margin: 7.5,
       color: variables.colorGreyDark,
    },
    delete_icon: {
        color: variables.colorWarning
    },
    extra_grid: {
        display: "flex"
    }
})