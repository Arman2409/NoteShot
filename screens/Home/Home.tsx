import { View, Text, Modal } from 'react-native';
import { Button } from 'antd-mobile';

import styles from './assests/styles.ts';

export default function Home({ navigation }: { navigation: any }) {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Welcome on Board</Text>
      
      <Button
        style={{
          margin: "0 auto"
        }}
        onClick={() => navigation.navigate("NewNote")}>
        Add Note
      </Button>

    </View>
  );
}