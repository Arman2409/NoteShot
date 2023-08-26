import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home/Home';
import CreateNote from '../screens/CreateNote/CreateNote';

const Stack = createNativeStackNavigator();

const Navigator = () => <NavigationContainer>
    <Stack.Navigator initialRouteName="NewNote">
       <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="NewNote" component={CreateNote} />
    </Stack.Navigator>
</NavigationContainer>

export default Navigator;