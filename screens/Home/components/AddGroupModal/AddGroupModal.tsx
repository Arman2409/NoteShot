import React, { useCallback, useState } from "react";
import Button from "@ant-design/react-native/lib/button";
import Modal from "@ant-design/react-native/lib/modal";
import InputItem from "@ant-design/react-native/lib/input-item";

import styles from "./media/addGroupStyles";
import globalStyles from "../../../../styles/globals";
import type { ModalProps } from "../../../../types/propTypes";
import type { GroupType } from "../../../../types/types";
import generateUniqueId from "../../../../globals/functions/generateUniqueId";

const AddGroup = ({ visible, setVisible, groups, setGroups }: ModalProps
    & { groups: GroupType[], setGroups: Function }) => {

    const [groupName, setGroupName] = useState<string>("");

    const addGroup = useCallback(() => {
        if (!groupName) {
            Modal.alert(
                "Error",
                "Group name cannot be empty", [
                { text: "OK", onPress: () => { } }
            ]
            )
        }
        generateUniqueId(groups, ((id: string) => {
            setGroups((groups: GroupType[]) => [
                {
                    id,
                    name: groupName,
                    memberNotes: []
                },
                ...groups,
            ])
        }))
        setVisible(false);
    }, [setGroups, groupName])

    return (
        <Modal
            popup
            animateAppear={true}
            animationType="slide-up"
            visible={visible}
            closable={true}
            maskClosable={true}
            onClose={() => setVisible(false)}
            style={styles.modal_main}
        >
            <InputItem
                onChange={setGroupName}
                value={groupName}
                placeholder="Enter Group Name here"
                style={styles.add_input}
            />
            <Button
                type="primary"
                size="large"
                style={{
                    ...globalStyles.modal_success_button,
                    ...styles.add_button
                }}
                onPress={addGroup}
            >
                Add Group
            </Button>
            <Button
                type="primary"
                size="large"
                style={globalStyles.modal_cancel_button}
                onPress={() => setVisible(false)}
            >
                Cancel
            </Button>
        </Modal>
    )
}

export default AddGroup;