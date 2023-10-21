import { useSelector } from "react-redux";
import useTimeZone from "../../../hooks/useTimeZone/useTimeZone";
import { selectAllUsers } from "../../../app/api/users/usersApiSelectors";
import {
  EditFormHeader,
  TextField,
  TextAreaField,
  SelectField,
  SelectUsersOptions,
  CheckBoxField,
} from "../FormComponents";

const NoteEditForm = ({ form, onSaveNote, onDeleteNote }) => {
  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;
  const users = useSelector(selectAllUsers);
  const { formattedDate } = useTimeZone();

  const formTitle = `Edit Note #${getValues("ticket")}`;
  const created =
    getValues("createdAt") && formattedDate(new Date(getValues("createdAt")));
  const updated =
    getValues("updatedAt") && formattedDate(new Date(getValues("updatedAt")));

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
    register: {
      ...register("text", {
        required: {
          value: true,
          message: "Text is required",
        },
      }),
    },
  };

  const checkBoxInputObject = {
    label: "WORK COMPLETE:",
    name: "completed",
    register: {
      ...register("completed"),
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
          message: "Username is required",
        },
      }),
    },
  };

  return (
    <>
      {users ? (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <EditFormHeader
            title={formTitle}
            onSave={handleSubmit(onSaveNote)}
            {...(onDeleteNote ? { onDelete: onDeleteNote } : {})}
          />
          <TextField inputObject={titleInputObjects} errors={errors} />
          <TextAreaField inputObject={textInputObjects} errors={errors} />
          <div className="form__row">
            <div className="form__divider">
              <CheckBoxField
                inputObject={checkBoxInputObject}
                errors={errors}
              />
              <SelectField
                selectObject={selectUsersInputObject}
                options={SelectUsersOptions(users)}
                errors={errors}
              />
            </div>
            <div className="form__divider">
              <p className="form__created">
                Created:
                <br />
                {created}
              </p>
              <p className="form__updated">
                Updated:
                <br />
                {updated}
              </p>
            </div>
          </div>
        </form>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default NoteEditForm;
