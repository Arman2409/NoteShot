import React from "react";
import { Text } from "react-native";
import Modal from "@ant-design/react-native/lib/modal";
import List from "@ant-design/react-native/lib/list";
import Button from "@ant-design/react-native/lib/button";
import { IoDocumentsOutline } from "react-icons/io5";

import styles from "./media/groupsModalStyles";
import globalStyles from "../../../../styles/globals";
import type { ModalProps } from "../../../../types/propTypes";
import type { GroupType } from "../../../../types/types";

const GroupsModal = ({ visible, setVisible, action, groups }:
    ModalProps & { action: Function, groups: GroupType[] }) => {
    return (
        <Modal
            popup
            visible={visible}
            animateAppear={true}
            closable={true}
            animationType="slide-up"
            onClose={() => setVisible(false)}
        >
            <Text style={globalStyles.modal_title}>
                Choose the group to add
            </Text>
            <List>
                {groups.map(({ id, name }: GroupType) => (
                    <List.Item
                        style={styles.group_item}
                        onPress={() => {
                            action(id);
                            setVisible(false);
                        }}>
                        {name}
                    </List.Item>
                ))}
            </List>
            <Button
                style={globalStyles.modal_cancel_button}
                size="small"
                onPress={() => setVisible(false)}
            >
                Cancel
            </Button>
        </Modal>
    )
}

export default GroupsModal;