import { useGetNotesQuery } from "../../app/api/notes/notesApiSlice"
import Error from "../../components/errors/error"
import NotesTable from "../../components/tables/notes/NotesTable"

const NoteListPage = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetNotesQuery()

let content

if (isLoading) content = <p>Loading...</p>
if (isError) content = <Error error={error}/>
if (isSuccess) content = <NotesTable ids={notes.ids} />

return content
}

export default NoteListPage
