import { useCallback, useContext } from 'react';
import { View, Text } from 'react-native';
import { Button, List } from 'antd-mobile';
import { AiFillDelete } from 'react-icons/ai';

import styles from './assests/styles.ts';
import { NotesAndStatusContext } from '../../App.tsx';
import { NoteType } from '../../types/types.ts';
import showDeleteModal from './functions/showDeleteModal.ts';

const testNotes = [{
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

export const Home = ({ navigation }: { navigation: any }) => {

  const { setCurrentNote, notes, setNotes } = useContext<any>(NotesAndStatusContext);

  const editNote = useCallback((note: NoteType) => {
    setCurrentNote(note);
    navigation.navigate("Note");
  }, [setCurrentNote])

  const addNote = useCallback(() => {
    setCurrentNote({});
    navigation.navigate("Note");
  }, [setCurrentNote])

  const deleteNote = useCallback((e: Event, id: string) => {
    e.stopPropagation();
    showDeleteModal(() => setNotes((notes: NoteType[]) => notes.filter(({ id: noteId }) => {
      return id !== noteId
    })
    ));
  }, [showDeleteModal, setNotes])

  return (
    <View style={styles.main}>
      <Text style={styles.title}>
        Welcome on Board
      </Text>
      <List
        header="My Notes"
        mode="card"
      >
        {notes.map(({ id, content, title, date }: NoteType) =>
          <List.Item
            key={id}
            arrow={false}
            onClick={() => editNote({ id, content, title, date })}
            style={{
              ...content.styles,
              "--adm-color-weak": content.styles?.color
            } as any}
            extra={<AiFillDelete
              style={styles.delete_icon}
              size={20}
              onClick={(e: any) => deleteNote(e, id)}
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
      {!notes.length && <Text
        style={styles.no_notes_text}
      >
        No notes yet
      </Text>}
      <Button
        block
        color="success"
        style={styles.add_button}
        onClick={addNote}
      >
        Add Note
      </Button>
    </View>
  );
}

export default Home;