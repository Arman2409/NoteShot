import { Modal } from "antd-mobile"

import styles from "../assets/styles"

export const showDeleteModal = (name: string, deleteFunction: any) => Modal.show({
    content: `Are you sure to delete the ${name}`,
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
