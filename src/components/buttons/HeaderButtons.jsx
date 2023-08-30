import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons"

const createCustomButton = (title, onClick, icon ) => {
    return (
    <button
        className="icon-button"
        title={title}
        onClick={onClick}
    >
        <FontAwesomeIcon icon={icon}/>
    </button>
    )
}

export const NotesButton = ({onClick })  => createCustomButton('Notes', onClick, faFilePen )
export const NewNoteButton = ({onClick })  => createCustomButton('New Note', onClick, faFileCirclePlus )
export const UsersButton = ({onClick })  => createCustomButton('Users', onClick, faUserGear )
export const NewUserButton = ({onClick })  => createCustomButton('New User ', onClick, faUserPlus )