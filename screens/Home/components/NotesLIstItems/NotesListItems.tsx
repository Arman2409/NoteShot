import { Text, View } from "react-native"
import { Grid, List } from "antd-mobile"
import { AiFillDelete } from "react-icons/ai"

import styles from "./media/notesListStyles";
import type { NotesListProps } from "../../../../types/propTypes"
import type { NoteType } from "../../../../types/types";
import trimString from "../../../../globals/functions/trimString";
import Priority from "./components/Priority/Priority";

const NotesListItems = ({ notes, areMembers, editNote, remove }: NotesListProps) => {
  notes = notes.sort(({priority: priority1}:NoteType, {priority: priority2}:NoteType) => {
     const prior1 = priority1 || 1;
     const prior2 = priority2 || 1;
     if (prior1 > prior2) {
      return -1; 
     }
     return 1;
  })

  return (
    <>
      {notes.map(({ id, content, priority, title, date, groupId }: NoteType) => (
        <List.Item
          key={id}
          arrow={false}
          onClick={() => editNote({ id, content, priority, title, date, groupId: areMembers ? groupId : null })}
          extra={<View><Grid columns={2} style={styles.extra_grid}>
            <Grid.Item>
              <Text style={styles.date}>
                {date}
              </Text>
            </Grid.Item>
            <Grid.Item>
              <AiFillDelete
                style={styles.delete_icon}
                size={20}
                onClick={(e: any) => remove(e, areMembers ? "member" : "note", id, areMembers ? groupId : null)}
              />
            </Grid.Item>
          </Grid>
          {Number.isInteger(priority) && <Priority priority={priority}/>}
          </View>}
          style={areMembers ? styles.member_notes_list_item : {}}
          description={<Text
            style={{
              ...content.styles,
              color: content.styles?.color
            }}>
            {trimString(content.data, 30)}
          </Text>}
        >
          <Text style={title.styles}>
            {trimString(title.data, 30)}
          </Text>
        </List.Item>)
      )}
    </>
  )
}

export default NotesListItems;