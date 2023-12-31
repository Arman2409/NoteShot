import React, { Suspense, lazy, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '@ant-design/react-native/lib/button';
import List from '@ant-design/react-native/lib/list';
import Flex from "@ant-design/react-native/lib/flex";

import styles from './media/homeStyles.ts';
import globalStyles from '../../styles/globals.ts';
import { NotesAndGroupsContext } from '../../App.tsx';
import type { GroupType, NoteType } from '../../types/types.ts';
import { showDelModal } from '../../globals/functions/showDelModal.ts';
import trimString from '../../globals/functions/trimString.ts';
import NotesListItems from './components/NotesLIstItems/NotesListItems.tsx';
const AddGroup = lazy(() => import('./components/AddGroupModal/AddGroupModal.tsx') as any);

export const Home = ({ navigation }: { navigation: any }) => {
  const [addGroupStatus, setAddGroupStatus] = useState<boolean>(false);
  const [openedGroup, setOpenedGroup] = useState<string>("");
  const { setCurrentNote, setAddingGroupId, groups, setGroups, notes, setNotes } = useContext<any>(NotesAndGroupsContext);

  const AddGroupModalMemo = useMemo(() => <AddGroup
    groups={groups}
    setGroups={setGroups}
    setVisible={setAddGroupStatus}
    visible={addGroupStatus} />, [groups, setGroups, setAddGroupStatus, addGroupStatus])

  const editNote = useCallback((note: NoteType) => {
    setCurrentNote(note);
    setAddingGroupId(null);
    navigation.navigate("Note");
  }, [setCurrentNote, setAddingGroupId])

  const addNote = useCallback(() => {
    setCurrentNote({});
    setAddingGroupId(null)
    navigation.navigate("Note");
  }, [setCurrentNote, setAddingGroupId])

  const remove = useCallback((e: Event, type: "note" | "group" | "member", id: string, parentId?: string) => {
    e.stopPropagation();
    switch (type) {
      case "note": showDelModal("to delete the \ Note", () => setNotes((notes: NoteType[]) => notes.filter(({ id: noteId }) => id !== noteId)));
        break;
      case "group": showDelModal("to delete the Group", () => setGroups((groups: GroupType[]) => groups.filter(({ id: groupId }) => id !== groupId)));
        break;
      case "member": showDelModal("to delete the Note", () => setGroups((groups: GroupType[]) => groups.map((group: GroupType) => {
        if (group.id === parentId) {
          const { name, memberNotes } = group;
          return {
            id: parentId,
            name,
            memberNotes: memberNotes.filter((note: NoteType) => note.id !== id),
          }
        }
        return group;
      })))
    }
  }, [showDelModal, setGroups, setNotes])

  const addToGroup = useCallback((e: Event, id: string) => {
    e.stopPropagation();
    setCurrentNote({});
    setAddingGroupId(id);
    navigation.navigate("Note");
  }, [setCurrentNote])

  useEffect(() => {
    navigation.setOptions({
      headerStyle: globalStyles.header
    })
  }, [])

  return (
    <View style={styles.main}>
      <View style={styles.add_buttons_cont}>
        <Button
          style={styles.add_button}
          onPress={() => setAddGroupStatus(true)}>
            <Icon name="add-to-photos" size={20}/>
        </Button>
        <Button
          style={styles.add_button}
          onPress={addNote}>
            <Icon name="add" size={20}/>
        </Button>
      </View>
      <Suspense fallback={"..."}>
        {AddGroupModalMemo}
      </Suspense>
      <List
        style={styles.notes_list}
      >
        {Boolean(groups.length) && groups.map(({ id, name, memberNotes }: GroupType) => (
          <View key={id}>
            <List.Item
              key={id}
              onPress={() => setOpenedGroup((curr: string) => curr === id ? "" : id)}
              extra={
                <View>
                  <Flex>
                    <Flex.Item
                        onClick={(event: any) => addToGroup(event, id)}
                        >
                      <Icon
                        name="note-add"
                        style={{
                          ...styles.add_icon,
                          ...styles.group_button
                        }}
                        size={16}
                      />
                    </Flex.Item>
                    <Flex.Item
                        onClick={(event: any) => remove(event, "group", id)}
                        >
                      <Icon
                        name="delete"
                        style={{
                          ...styles.group_button,
                          ...styles.delete_icon
                        }}
                        size={20}
                      />
                    </Flex.Item>
                  </Flex>
                </View>}
            >
              <Text>
                {trimString(name, 30)}
              </Text>
            </List.Item>
            {openedGroup === id && Boolean(memberNotes?.length) && <List style={styles.member_notes_list}>
              <NotesListItems
                notes={memberNotes}
                areMembers={true}
                remove={remove}
                editNote={editNote}
                groupId={id}
              />
            </List>}
          </View>
        ))}
        <NotesListItems
          notes={notes}
          areMembers={false}
          remove={remove}
          editNote={editNote}
        />
      </List>
      {!notes.length && !groups.length && <Text
        style={styles.no_notes_text}
      >
        Nothing here yet
      </Text>}
    </View>
  );
}

export default Home;