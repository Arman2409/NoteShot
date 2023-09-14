import { StyleSheet, View } from "react-native";

import variables from "../../../../../styles/variables";

export default StyleSheet.create({
    member_notes_list_item: {
        backgroundColor: variables.colorLight,
        padding: 5,
        paddingLeft: 10,
    },
    title: {
        marginLeft: 10
    },
    content: {
        marginLeft: 10
    },
    date: {
        margin: 7.5,
        color: variables.colorGreyDark,
    },
    delete_icon: {
        color: variables.colorWarning
    },
    extra_grid: {
        display: "flex",
        padding: 5,
    }
})