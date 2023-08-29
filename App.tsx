import { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home/Home';
import Note from './screens/Note/Note';
import { NoteType } from './types/types';

const Stack = createNativeStackNavigator();

export const NotesAndStatusContext = createContext({});

const App = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [currentNote, setCurrentNote] = useState<NoteType>({} as NoteType);

    return <NotesAndStatusContext.Provider value={{ notes, setNotes, currentNote, setCurrentNote }}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Note" component={Note} />
            </Stack.Navigator>
        </NavigationContainer>
    </NotesAndStatusContext.Provider >
}

export default App;