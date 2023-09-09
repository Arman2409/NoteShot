import { Modal } from "antd-mobile"

import globalStyles from "../../styles/globals"

export const showDelModal = (
    actionName: string,
    deleteFunction: any,
    confirmText: string = "Delete") => Modal.show({
        content: `Are you sure to ${actionName}`,
        closeOnAction: true,
        actions: [
            {
                key: "delete",
                text: confirmText,
                style: globalStyles.modal_cancel_button,
                onClick: () => deleteFunction()
            },
            {
                key: "cancel",
                text: "Cancel",
                style: globalStyles.modal_success_button,
                onClick: () => Modal.clear()
            },
        ]
})