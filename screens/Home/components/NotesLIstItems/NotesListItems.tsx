import { Text, View } from "react-native"
import List from "@ant-design/react-native/lib/list";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./media/notesListStyles";
import type { NotesListProps } from "../../../../types/propTypes"
import type { NoteType } from "../../../../types/types";
import trimString from "../../../../globals/functions/trimString";
import Priority from "./components/Priority/Priority";

const NotesListItems = ({ notes, areMembers, editNote, remove }: NotesListProps) => {
  notes = notes.sort(({ priority: priority1 }: NoteType, { priority: priority2 }: NoteType) => {
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
          onPress={() => editNote({ id, content, priority, title, date, groupId: areMembers ? groupId : null })}
          extra={<View style={styles.extra_cont}>
            <View style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}>
              <Text style={styles.date}>
                {date}
              </Text>
              <Icon
                name="trash"
                style={styles.delete_icon}
                size={20}
                onPress={(e: any) => remove(e, areMembers ? "member" : "note", id, areMembers ? groupId : null)}
              />
            </View>
            {Number.isInteger(priority) && <Priority priority={priority} />}
          </View>}
          style={areMembers ? styles.member_notes_list_item : {}}
        >
          <List.Item.Brief style={{
            ...content.styles,
            ...styles.content,
            color: content.styles?.color
          }}>
            {trimString(content.data, 30)}
          </List.Item.Brief>
          <Text style={{
            ...title.styles,
            ...styles.title
          }}>
            {trimString(title.data, 30)}
          </Text>
        </List.Item>)
      )}
    </>
  )
}

export default NotesListItems;