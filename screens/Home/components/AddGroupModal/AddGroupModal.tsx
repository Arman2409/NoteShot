import { useCallback } from "react";
import { Button, Form, Input, Modal } from "antd-mobile";

import type { ModalProps } from "../../../../types/propTypes";
import type { GroupType } from "../../../../types/types";
import generateUniqueId from "../../../../globals/functions/generateUniqueId";
import styles from "./media/addGroupStyles";

const AddGroup = ({visible, setVisible,  groups, setGroups}:ModalProps
       & {groups: GroupType[], setGroups: Function}) => {

    const addGroup = useCallback(({name}:GroupType) => {
        generateUniqueId(groups, ((id: string) => {
            setGroups((groups: GroupType[]) => [
                {
                    id,
                    name,
                    memberNotes: []
                },
                ...groups,
            ])
        }))
        setVisible(false);
    }, [setGroups])

    return (
        <Modal 
          visible={visible} 
          onClose={() => setVisible(false)}
          content={
            <Form 
              onFinish={addGroup}
              >
                 <Form.Item
                    name="name"
                    rules={[{required: true,  min: 2, message: "Minimum 2 letters for group name"} ]}
                >
                    <Input 
                      placeholder="Type the group's name"
                      style={styles.add_input}
                      clearable
                     />
                </Form.Item>
                 <Button 
                  block
                  type="submit"
                  size="small"
                  style={styles.add_button}
                  >
                    Add Group
                </Button>
                 <Button 
                  block
                  style={styles.cancel_button}
                  size="small"
                  onClick={() => setVisible(false)}
                  >
                   Cancel
                </Button>
            </Form>
        } />
    )
}

export default AddGroup;