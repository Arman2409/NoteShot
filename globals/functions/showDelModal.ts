import { Modal } from "antd-mobile"

import { deleteModalStyles as styles } from "./assets/styles"

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
                style: styles.delete_button,
                onClick: () => deleteFunction()
            },
            {
                key: "cancel",
                text: "Cancel",
                style: styles.cancel_button,
                onClick: () => Modal.clear()
            },
        ]
    })