import React, { useState } from "react";
import { View, Text } from "react-native";
import Modal from "@ant-design/react-native/lib/modal";
import Button from "@ant-design/react-native/lib/button";
import Stepper from "@ant-design/react-native/lib/stepper";

import globalStyles from "../../../../styles/globals";
import type { ModalProps } from "../../../../types/propTypes";

const PriorityModal = (
    { visible, setVisible, updatePriority, defaultValue }: ModalProps
        & { updatePriority: Function, defaultValue: number }) => {
    const [priority, setPriority] = useState<number>(0);

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
                Change note's priority
            </Text>
            <View style={globalStyles.centered}>
                <Stepper
                    min={0}
                    max={5}
                    defaultValue={defaultValue}
                    onChange={(value: number) => setPriority(value)}
                />
                <Button
                    size="small"
                    style={{
                        ...globalStyles.modal_success_button,
                        marginTop: 15
                    }}
                    onPress={() => updatePriority(priority)}
                >
                    Save
                </Button>
            </View>
        </Modal>
    )
}

export default PriorityModal;