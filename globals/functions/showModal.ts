import { Modal } from "antd-mobile"

import { deleteModalStyles as styles } from "./assets/styles"

export const showModal = (action: string, deleteFunction: any) => Modal.show({
    content: `Are you sure to ${action}`,
    closeOnAction: true,
    actions: [
        {
            key: "delete",
            text: "Delete",
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