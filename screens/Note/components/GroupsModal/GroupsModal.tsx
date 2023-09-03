import { Button, List, Modal } from "antd-mobile";
import { IoDocumentsOutline } from "react-icons/io5";

import { ModalProps } from "../../../../types/propTypes";
import { GroupType } from "../../../../types/types";
import styles from "./assets/styles";

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
                    style={styles.cancel_button}
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