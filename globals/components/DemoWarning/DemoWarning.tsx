import { View, Text } from "react-native";

import styles from "./media/demoStyles";
import { DemoWarningProps } from "../../../types/propTypes";

const DemoWarning = ({warning}:DemoWarningProps) => <View style={styles.demo_main}>
    <View style={styles.warning_cont}>
        <Text style={styles.warning_text}>{warning}</Text>
    </View>
</View>

export default DemoWarning;