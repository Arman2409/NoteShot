import { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home/Home';
import Note from './screens/Note/Note';
import type { GroupType, NoteType } from './types/types';
import { groups as initialGroups, notes as initialNotes } from "./initialData.json";

const Stack = createNativeStackNavigator();

export const NotesAndGroupsContext = createContext({});

const App = () => {
    const [notes, setNotes] = useState<NoteType[]>(initialNotes);
    const [groups, setGroups] = useState<GroupType[]>(initialGroups);
    const [addingGroupId, setAddingGroupId] = useState<string | null>(null);
    const [currentNote, setCurrentNote] = useState<NoteType>({} as NoteType);

    return (
        <NotesAndGroupsContext.Provider
            value={{
                notes,
                addingGroupId,
                setAddingGroupId,
                setNotes,
                currentNote,
                setCurrentNote,
                groups,
                setGroups
            }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Note" component={Note} />
                </Stack.Navigator>
            </NavigationContainer>
        </NotesAndGroupsContext.Provider >)
}

export default App;