import { StyleSheet } from "react-native";

import variables from "../../../styles/variables"

export const notificationStyles = StyleSheet.create({
    notification: {
        width: 150,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: variables.colorGreyLight,
        boxShadow: variables.buttonBoxShadow,
        transition: "1s",
        marginLeft: "auto",
        marginRight: "auto",
        border: `1px solid ${variables.colorGreyLight}`,
        top: -100,
        position: "absolute",
        right: 0,
        left: 0,
        fontSize: 20
    }
})