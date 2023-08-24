import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useTimeZone from "../../../hooks/useTimeZone/useTimeZone";
import { selectNoteById } from "../../../app/api/notes/notesApiSelectors";
import { useSelector } from "react-redux";

const NotesTableRow = ({ noteId }) => {
  const { formattedDate } = useTimeZone();
  const note = useSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();

  let content;

  if (note) {
    const handleEdit = () => navigate(`/dash/notes/${noteId}`);
    const created = formattedDate(new Date(note.createdAt));
    const updated = formattedDate(new Date(note.updatedAt));

    content = (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }
  return content;
};

export default NotesTableRow;
