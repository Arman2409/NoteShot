import { Button, List, Modal } from "antd-mobile";
import { IoDocumentsOutline } from "react-icons/io5";

import styles from "./media/groupsModalStyles";
import globalStyles from "../../../../styles/globals";
import type { ModalProps } from "../../../../types/propTypes";
import type { GroupType } from "../../../../types/types";

const GroupsModal = ({ visible, setVisible, action, groups }:
    ModalProps & { action: Function, groups: GroupType[] }) => {
    return (
        <Modal
            visible={visible}
            onClose={() => setVisible(false)}
            title="Choose the group to add"
            content={<>
                <List>
                    {groups.map(({ id, name }: GroupType) => (
                        <List.Item
                            arrow={false}
                            style={styles.group_item}
                            prefix={<IoDocumentsOutline />}
                            onClick={() => {
                                action(id);
                                setVisible(false);
                            }}>
                            {name}
                        </List.Item>
                    ))}
                </List>
                <Button
                    block
                    style={globalStyles.modal_cancel_button}
                    size="small"
                    onClick={() => setVisible(false)}
                >
                    Cancel
                </Button>
            </>}
        />
    )
}

export default GroupsModal;