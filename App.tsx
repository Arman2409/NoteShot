import { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home/Home';
import Note from './screens/Note/Note';
import type { GroupType, NoteType } from './types/types';

const Stack = createNativeStackNavigator();

export const NotesAndStatusContext = createContext(null);

const testNotes = [{
    date: "29 Aug 2023",
    id: "dnucksndkjdskjlcmdklvv",
    groupId: null,
    title: {
        data: "fvfv",
        styles: {
            color: "red",
            fontStyle: "italic"
        }
    },
    content: {
        data: "vfvfvfdc",
        styles: {
            color: "green"
        }
    }
}]

const testGroups = [{
    id: "$2a$05$cVWpIDLXr9IHZC0W.xSaMOZJjk7VTmHF0HfKB6D9PPm3f7U6ZRn2e",
    memberNotes: [],
    name: "frfrfr"
}]

const App = () => {
    const [notes, setNotes] = useState<NoteType[]>(testNotes);
    const [groups, setGroups] = useState<GroupType[]>(testGroups);
    const [addingGroupId, setAddingGroupId] = useState<string | null>(null);
    const [currentNote, setCurrentNote] = useState<NoteType>({} as NoteType);

    useEffect(() => {
        console.log({
            groups
        });
    }, [groups]);

    return <NotesAndStatusContext.Provider value={{ notes, addingGroupId, setAddingGroupId, setNotes, currentNote, setCurrentNote, groups, setGroups }}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Note" component={Note} />
            </Stack.Navigator>
        </NavigationContainer>
    </NotesAndStatusContext.Provider >
}

export default App;