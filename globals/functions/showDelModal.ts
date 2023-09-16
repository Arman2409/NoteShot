import Modal from "@ant-design/react-native/lib/modal";

import globalStyles from "../../styles/globals"

export const showDelModal = (
    actionName: string,
    deleteFunction: any,
    confirmText: string = "Delete") => Modal.alert(
        `Are you sure to ${actionName}`,
        "",
         [
            {
                text: confirmText,
                style: globalStyles.modal_cancel_button,
                onPress: () => deleteFunction()
            },
            {
                text: "Cancel",
                style: globalStyles.modal_success_button,
            },
        ]
)