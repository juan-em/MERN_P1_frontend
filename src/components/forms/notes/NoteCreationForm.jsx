import { useSelector } from "react-redux";
import { selectAllUsers } from "../../../app/api/users/usersApiSelectors";
import {
  NewFormHeader,
  TextField,
  SelectField,
  SelectUsersOptions,
} from "../FormComponents";
import { Error } from "../../errors/Error";

const NoteCreationForm = ({ form, onSubmit }) => {
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const users = useSelector(selectAllUsers);

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
  };

  const selectUsersInputObject = {
    label: "ASSIGNED TO:",
    name: "user",
    description: "(just 1)",
    register: {
      ...register("user", {
        required: {
          value: true,
          message: "You have to asign 1 user to this note",
        },
      }),
    },
  };

  if (!users?.length) {
    let error = {
      data: {
        message: "No currently available (No users)",
      },
    };
    return <Error error={error} />;
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <NewFormHeader title={formTitle} />
      <TextField inputObject={titleInputObjects} errors={errors} />
      <TextField inputObject={textInputObjects} errors={errors} />
      <SelectField
        selectObject={selectUsersInputObject}
        options={SelectUsersOptions(users)}
        errors={errors}
      />
    </form>
  );
};

export default NoteCreationForm;
