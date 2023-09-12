import { useState } from "react";
import { View } from "react-native";
import { Button, Modal, Rate } from "antd-mobile";

import globalStyles from "../../../../styles/globals";
import type { ModalProps } from "../../../../types/propTypes";

const PriorityModal = (
    { visible, setVisible, updatePriority, defaultValue }: ModalProps
     & { updatePriority: Function, defaultValue: number }) => {
    const [priority, setPriority] = useState<number>(0);

    return (
        <Modal
            visible={visible}
            onClose={() => setVisible(false)}
            showCloseButton
            title="Change note's priority"
            content={<View style={globalStyles.centered}>
                <Rate
                    defaultValue={defaultValue}
                    onChange={(value: number) => setPriority(value)}
                />
                <Button
                    block
                    size="small"
                    style={{
                        ...globalStyles.modal_success_button,
                        marginTop: 5
                    }}
                    onClick={() => updatePriority(priority)}
                >
                    Save
                </Button>
            </View>
            }
        />
    )
}

export default PriorityModal;