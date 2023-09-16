import { StyleSheet } from "react-native";

import variables from "../../../../../styles/variables";

export default StyleSheet.create({
    main: {
      flexDirection: "row",
    },
    item: { 
        width: 40,
        height: 40,
        borderRadius: 2,
        borderWidth: 1,
        backgroundColor: "red",
        borderColor: variables.colorDark,
        margin: 5,
    }
})