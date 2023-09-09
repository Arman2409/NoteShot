import { Text, View } from "react-native"
import { Grid, List } from "antd-mobile"

import styles from "./media/notesListStyles";
import type { NotesListProps } from "../../../../types/propTypes"
import type { NoteType } from "../../../../types/types";
import { AiFillDelete } from "react-icons/ai"
import trimString from "../../../../globals/functions/trimString"

const NotesListItems = ({ notes, areMembers, editNote, remove }: NotesListProps) => {
  return (
    <>
      {notes.map(({ id, content, title, date, groupId }: NoteType) => (
        <List.Item
          key={id}
          arrow={false}
          onClick={() => editNote({ id, content, title, date, groupId: areMembers ? groupId : null })}
          extra={<Grid columns={2} style={{display: "flex"}}>
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

          </Grid>}
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