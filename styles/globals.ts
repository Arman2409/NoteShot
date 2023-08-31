import { StyleSheet } from "react-native";
import variables from "./variables";

export default StyleSheet.create({
   centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   },
   header: {
      backgroundColor: variables.colorLight,
      color: variables.colorGreyDark,
   }
})