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
} = useGetNotesQuery({
  pollingInterval: 15000, // Perform a new query every 60 seconds to keep the data updated.
  refetchOnFocus: true, // Perform a new query when the user refocuses on the page.
  refetchOnMountOrArgChange: true, // Perform a new query when the component is remounted or when query arguments change.
});

let content

if (isLoading) content = <p>Loading...</p>
if (isError) content = <Error error={error}/>
if (isSuccess) content = <NotesTable ids={notes.ids} />

return content
}

export default NoteListPage
