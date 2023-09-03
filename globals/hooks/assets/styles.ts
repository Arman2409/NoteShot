import { StyleSheet } from "react-native";

import variables from "../../../styles/variables"

export const notificationStyles = StyleSheet.create({
    notificationInlineStyles: {
        width: "150px" as any,
        height: "50px" as any,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: variables.colorGreyLight,
        boxShadow: variables.buttonBoxShadow,
        transition: "0.25s",
        marginLeft: "auto",
        marginRight: "auto",
        border: `1px solid ${variables.colorGreyLight}`,
        borderRadius: 10,
        top: "-200px" as any,
        position: "absolute",
        right: 0,
        left: 0,
        fontSize: 20
    }
})