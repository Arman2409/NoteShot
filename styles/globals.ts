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
   },
   modal_title: {
         color: variables.colorGreyDark,
         marginHorizontal: "auto"
   },
   modal_cancel_button: {
      backgroundColor: variables.colorWarning,
      color: variables.colorLight,
   },
   modal_success_button: {
         backgroundColor: variables.colorSuccess,
         color: variables.colorLight,
   }
})