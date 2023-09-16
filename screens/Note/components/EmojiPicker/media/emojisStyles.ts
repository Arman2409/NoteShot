import { StyleSheet } from "react-native";

export default StyleSheet.create({
    emojis_main: {
       padding: 20,
    },
    close_button: {
      position: "absolute",
      top: 5,
      right: 5
    },
    emojis_cont: {
        padding: 10,
        width: "100%",
        height: "80%",
        overflow: "hidden"
     },
     selected_cont: {
       height: 20,
       padding: 5,
       fontSize: 20
     },
     delete_icon: {
        position: "absolute",
        right: 5,
        top: 5,
        fontSize: 20
     }
})