import { createContext, useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import type { GroupType, NoteType } from './types/types';
import { groups as initialGroups, notes as initialNotes, dimesionsWarning } from "./initialData.json";
import Home from './screens/Home/Home';
import Note from './screens/Note/Note';
import DemoWarning from './globals/components/DemoWarning/DemoWarning';

const Stack = createNativeStackNavigator();

export const NotesAndGroupsContext = createContext({});

const App = () => {
    const [notes, setNotes] = useState<NoteType[]>(initialNotes);
    const [groups, setGroups] = useState<GroupType[]>(initialGroups);
    const [addingGroupId, setAddingGroupId] = useState<string | null>(null);
    const [currentNote, setCurrentNote] = useState<NoteType>({} as NoteType);
    const [showWarning, setShowWarning] = useState<boolean>(true);

    const changeWarningStatus = useCallback((innerWidth:number) => {
        if (innerWidth < 600) {
            setShowWarning(false);
        }
        if (innerWidth >= 600) {
            setShowWarning(true);
        }
    }, [setShowWarning])

    useEffect(() => {
        const {innerWidth} = window;
        changeWarningStatus(innerWidth);
        window.addEventListener("resize", (e: any) => {
            const {innerWidth} = e.currentTarget
            changeWarningStatus(innerWidth);
        })
    }, [window]);

    return (
        <>
            {showWarning && <DemoWarning warning={dimesionsWarning} />}
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
            </NotesAndGroupsContext.Provider >
        </>
    )
}

export default App;