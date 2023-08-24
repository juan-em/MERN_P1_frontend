import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "../../app/api/notes/notesApiSlice";
import { selectNoteById } from "../../app/api/notes/notesApiSelectors";

import EditNoteForm from "../../components/forms/notes/EditNoteForm";

const NoteEditPage = () => {
  const [
    updateNote,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const { id } = useParams();
  const noteSelected = useSelector((state) => selectNoteById(state, id));
  const form = useForm({ defaultValues: noteSelected });

  const onSaveNote = async (data) => {
    data.id = id
    await updateNote(data);
  };
  const onDeleteNote = async () => {
    await deleteNote({ id });
  };

  useEffect(() => {
    if (isUpdateSuccess || isDeleteSuccess) {
      const msg = isUpdateSuccess ? "Note updated" : "Note deleted";
      window.alert(msg);
      navigate("/dash/notes");
    }
  }, [isUpdateSuccess, isDeleteSuccess]);

  useEffect(() => {
    if (noteSelected) form.reset(noteSelected)
  }, [noteSelected])

  return (
    <>{noteSelected ? 
      <>
       {isUpdateError && <p className="errmsg">{updateError?.data?.message}</p>}
       {isDeleteError && <p className="errmsg">{deleteError?.data?.message}</p>}
       <EditNoteForm
         form={form}
         onSaveNote={onSaveNote}
         onDeleteNote={onDeleteNote}
       />
       {isUpdateLoading && <p>Updating...</p>}
      </>
    :(
      <p>Loading...</p>
      )
    }
    </>
  );
};

export default NoteEditPage;
