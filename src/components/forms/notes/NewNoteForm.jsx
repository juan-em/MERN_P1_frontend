import { useSelector } from "react-redux";
import { selectAllUsers } from "../../../app/api/users/usersApiSelectors";
import { NewFormHeader, TextField, SelectField, SelectUsersOptions} from "../FormComponents";

const NewNoteForm = ({ form, onSubmit }) => {
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const users = useSelector(selectAllUsers)

  const formTitle = "New Note";

  const titleInputObjects = {
    label: "Title:",
    name: "title",
    type: "text",
    register: {
      ...register("title", {
        required: {
          value: true,
          message: "Title is required",
        },
      }),
    },
  };

  const textInputObjects = {
    label: "Text:",
    name: "text",
    type: "text",
    register: {
      ...register("text", {
        required: {
          value: true,
          message: "Text is required",
        },
      }),
    },
  }

  const selectUsersInputObject = {
    label: "ASSIGNED TO:",
    name: "user",
    description: "(just 1)",
    register: {
      ...register("user", {
        required: {
            value: true,
            message: "Username is required",
          },
      }),
    },
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <NewFormHeader title={formTitle} />
        <TextField inputObject={titleInputObjects} errors={errors}/>
        <TextField inputObject={textInputObjects} errors={errors}/>
        <SelectField selectObject={selectUsersInputObject} options={SelectUsersOptions(users)} errors={errors} />
      </form>
      
        {/* <p className={errClass}>{error?.data?.message}</p> */}
    </>
  );
};

export default NewNoteForm;
