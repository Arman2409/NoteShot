import { useCallback, useContext } from "react";
import { Button, Form, Input, Modal } from "antd-mobile";

import { AddGroupProps } from "../../../../types/propTypes";
import type { GroupType } from "../../../../types/types";
import { NotesAndStatusContext } from "../../../../App";
import { generateUniqueId } from "../../../Note/utils/functions";
import styles from "./assets/styles";

const AddGroup = ({visible, setVisible}:AddGroupProps) => {
    const { groups, setGroups } = useContext<any>(NotesAndStatusContext);

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
    }, [setGroups])

    return (
        <Modal 
          visible={visible} 
          closeOnAction
          showCloseButton
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
                      clearable
                     />
                </Form.Item>
                 <Button 
                  block
                  type="submit"
                  style={styles.add_button}
                  >
                    Add Group
                </Button>
                 <Button 
                  block
                  style={styles.cancel_button}
                  onClick={() => setVisible(false)}
                  >
                   Cancel
                </Button>
            </Form>
        } />
    )
}

export default AddGroup;