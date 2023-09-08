import { StyleSheet } from "react-native";

import variables from "../../../../styles/variables";
import globals from "../../../../styles/globals";

export default StyleSheet.create({
    demo_main: {
        ...globals.centered,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: variables.colorGreyDark,
        opacity: 0.5,
        zIndex: 10
    },
    warning_cont: {
        ...globals.centered,
        width: 350,
        height: 200,
        padding: 10,
        backgroundColor: variables.colorDark,
        opacity: 0.8,
       
    },
    warning_text: {
        color: variables.colorLight,
        fontSize: 35
    }
})