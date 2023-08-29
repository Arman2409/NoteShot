import { Modal } from "antd-mobile"

const showDeleteModal = (deleteFunction:any) => Modal.show({
    content: "Are you sure to delete the Note",
    closeOnAction: true,
    actions: [
        {
           key: "delete",
           text: "Delete",
           style: {
             backgroundColor: "red"
           },
           onClick: () => deleteFunction()
        },
        {
            key: "cancel",
            text: "Cancel",
            onClick: () => Modal.clear()
         },
    ]
})

export default showDeleteModal;