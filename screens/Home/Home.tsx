import { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, List } from 'antd-mobile';
import { AiFillDelete } from 'react-icons/ai';
import { PiCirclesThreePlusLight } from "react-icons/pi"
import { IoDocumentsOutline } from "react-icons/io5";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { LuPlus } from 'react-icons/lu';

import styles from './assets/styles.ts';
import { NotesAndStatusContext } from '../../App.tsx';
import type { GroupType, NoteType } from '../../types/types.ts';
import { showDeleteModal } from './functions/functions.ts';
import AddGroup from './components/AddGroup/AddGroup.tsx';

export const Home = ({ navigation }: { navigation: any }) => {
  const [addGroupStatus, setAddGroupStatus] = useState<boolean>(false);
  const [openedGroup, setOpenedGroup] = useState<string>("");
  const { setCurrentNote, setAddingGroupId, groups, setGroups, notes, setNotes } = useContext<any>(NotesAndStatusContext);

  const editNote = useCallback((note: NoteType) => {
    setCurrentNote(note);
    setAddingGroupId(null);
    navigation.navigate("Note");
  }, [setCurrentNote])

  const addNote = useCallback(() => {
    setCurrentNote({});
    setAddingGroupId(null)
    navigation.navigate("Note");
  }, [setCurrentNote])

  const remove = useCallback((e: Event, type: "note" | "group" | "member", id: string, parentId?: string) => {
    e.stopPropagation();
    switch (type) {
      case "note": showDeleteModal("Note",() => setNotes((notes: NoteType[]) => notes.filter(({ id: noteId }) => id !== noteId)));
        break;
      case "group": showDeleteModal("Group", () => setGroups((groups: GroupType[]) => groups.filter(({ id: groupId }) => id !== groupId)));
        break;
      case "member": showDeleteModal("Note", () => setGroups((groups: GroupType[]) => groups.map((group: GroupType) => {
         if(group.id === parentId) {
           const { name, memberNotes} = group;
           return {
            id: parentId,
            name,
            memberNotes: memberNotes.filter((note:NoteType) => note.id !== id),
           }
         }
         return group;
      })))
    }
  }, [showDeleteModal, setNotes])

  const addToGroup = useCallback((e: Event, id: string) => {
    e.stopPropagation();
    setCurrentNote({});
    setAddingGroupId(id);
    navigation.navigate("Note");
  }, [setCurrentNote])

  return (
    <View style={styles.main}>
      <View style={styles.add_buttons_cont}>
        <Button
          block
          style={styles.add_button}
          onClick={() => setAddGroupStatus(true)}>
          <PiCirclesThreePlusLight />
        </Button>
        <Button
          block
          style={styles.add_button}
          onClick={addNote}>
          <LuPlus />
        </Button>
      </View>
      <AddGroup
        setVisible={setAddGroupStatus}
        visible={addGroupStatus} />
      <List
        header="My Notes"
        mode="card"
      >
        {Boolean(groups.length) && groups.map(({ id, name, memberNotes }: GroupType) => (
          <>
            <List.Item
              key={id}
              arrow={false}
              prefix={<IoDocumentsOutline />}
              onClick={() => setOpenedGroup((curr: string) => curr === id ? "" : id)}
              extra={<>
                <BsFileEarmarkPlus
                  style={{
                    ...styles.add_icon,
                    ...styles.group_button
                  }}
                  size={16}
                  onClick={(event: any) => addToGroup(event, id)}
                />
                <AiFillDelete
                  style={{
                    ...styles.group_button,
                    ...styles.delete_icon
                  }}
                  size={20}
                  onClick={(event: any) => remove(event, "group", id)}
                />
              </>}
            >
              <Text>
                {name}
              </Text>
            </List.Item>
            {openedGroup === id && Boolean(memberNotes?.length) && <List style={styles.member_notes_list}>
              {memberNotes.map(({ id: memberId, content, title, date, groupId }: NoteType) =>
                <List.Item
                  key={memberId}
                  arrow={false}
                  onClick={() => editNote({ id: memberId, content, title, date, groupId })}
                  style={{
                    ...styles.member_notes_list_item,
                    ...content.styles,
                    "--adm-color-weak": content.styles?.color
                  } as any}
                  extra={<AiFillDelete
                    style={styles.delete_icon}
                    size={20}
                    onClick={(e: any) => remove(e, "member", memberId, id)}
                  />}
                  description={content.data}
                >
                  <Text style={{
                    ...title.styles
                  }}>
                    {title.data}
                  </Text>
                </List.Item>)}
            </List>}
          </>
        ))}
        {notes.map(({ id, content, title, date, groupId }: NoteType) =>
          <List.Item
            key={id}
            arrow={false}
            onClick={() => editNote({ id, content, title, date, groupId })}
            style={{
              ...content.styles,
              "--adm-color-weak": content.styles?.color
            } as any}
            extra={<AiFillDelete
              style={styles.delete_icon}
              size={20}
              onClick={(e: any) => remove(e, "note", id)}
            />}
            description={content.data}
          >
            <Text style={{
              ...title.styles
            }}>
              {title.data}
            </Text>
          </List.Item>
        )}
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