import { useGetNotesQuery } from "../../app/api/notes/notesApiSlice"
import { Error } from "../../components/errors/Error"
import NotesTable from "../../components/tables/notes/NotesTable"
import useAuth from "../../hooks/useAuth/useAuth"

const NoteListPage = () => {

  const {username, isAdmin, isManager} = useAuth()
  let queryParams = {
    endpointName: 'notesList',
  }
  if (!isAdmin && !isManager) queryParams.user = username
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetNotesQuery(queryParams,{
  pollingInterval: 15000, // Perform a new query every 15 seconds to keep the data updated.
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
