import { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, List } from 'antd-mobile';
import { AiFillDelete } from 'react-icons/ai';
import { PiCirclesThreePlusLight } from "react-icons/pi"
import { IoDocumentsOutline } from "react-icons/io5";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { LuPlus } from 'react-icons/lu';

import styles from './assests/styles.ts';
import { NotesAndStatusContext } from '../../App.tsx';
import type { GroupType, NoteType } from '../../types/types.ts';
import { showDeleteModal } from './functions/functions.ts';
import AddGroup from './components/AddGroup/AddGroup.tsx';

export const Home = ({ navigation }: { navigation: any }) => {
  const [addGroupStatus, setAddGroupStatus] = useState<boolean>(false);
  const [openedGroup, setOpenedGroup] = useState<string>("");
  const { setCurrentNote, setAddingGroupId, groups, notes, setNotes } = useContext<any>(NotesAndStatusContext);

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

  const remove = useCallback((e: Event, type: "note" | "group", id: string) => {
    e.stopPropagation();
    showDeleteModal(type === "note" ?
      () => setNotes((notes: NoteType[]) => notes.filter(({ id: noteId }) => id !== noteId)) :
      () => setNotes((notes: NoteType[]) => notes.filter(({ id: noteId }) => id !== noteId)));
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
                  style={styles.group_button}
                  size={20}
                  onClick={(e: any) => addToGroup(e, id)}
                />
                <AiFillDelete
                  style={{
                    ...styles.group_button,
                    ...styles.delete_icon
                  }}
                  size={20}
                  onClick={(e: any) => remove(e, "group", id)}
                />
              </>}
            >
              <Text style={{}}>
                {name}
              </Text>
            </List.Item>
            {openedGroup === id && Boolean(memberNotes?.length) && <List style={styles.member_notes_list}>
              {memberNotes.map(({ id, content, title, date, groupId }: NoteType) =>
                <List.Item
                  key={id}
                  arrow={false}
                  onClick={() => editNote({ id, content, title, date, groupId })}
                  style={{
                    ...styles.member_notes_list_item,
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