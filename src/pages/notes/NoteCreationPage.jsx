import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "../../app/api/notes/notesApiSlice";
import NoteCreationForm from "../../components/forms/notes/NoteCreationForm";

const NoteCreationPage = () => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  const form = useForm();
  const navigate = useNavigate();

  const onSaveNoteClicked = async (data) => {
    await addNewNote(data);
  };

  useEffect(() => {
    if (isSuccess) {
      window.alert("Note saved");
      const { reset } = form;
      reset();
      navigate("/dash/notes");
    }
  }, [isSuccess]);

  return (
    <>
      {isError && <p className="errmsg">{error?.data?.message}</p>}
      <NoteCreationForm form={form} onSubmit={onSaveNoteClicked} />
      {isLoading && <p>Saving...</p>}
    </>
  );
};

export default NoteCreationPage;
