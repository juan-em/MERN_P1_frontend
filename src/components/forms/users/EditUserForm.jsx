import {
  USERS_ROLES,
  USER_PWD_REGEX,
  USER_REGEX,
} from "../../../constants/userConstants";
import {
  TextField,
  SelectField,
  EditFormHeader,
  SelectRolesOptions,
  CheckBoxField,
} from "../FormComponents";

const EditUserForm = ({ form, onSaveUser, onDeleteUser }) => {
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const formTitle = "Edit User";

  const usernameInputObject = {
    label: "Username:",
    name: "username",
    type: "text",
    description: "[3-20 letters]",
    register: {
      ...register("username", {
        required: {
          value: true,
          message: "Username is required",
        },
        pattern: {
          value: USER_REGEX,
          message: "Invalid username format",
        },
      }),
    },
  };

  const passwordInputObject = {
    label: "Password:",
    name: "password",
    type: "password",
    description: "[empty = no change] | [4-12 chars incl. !@#$%]",
    register: {
      ...register("password", {
        validate: (value) => {
          if (value === "" || USER_PWD_REGEX.test(value)) {
            return true;
          }
          return "Invalid password format";
        },
      }),
    },
  };

  const selectInputObject = {
    label: "ASSIGNED ROLES:",
    name: "roles",
    multiple: true,
    description: "(can select more than 1)",
    register: {
      ...register("roles", {
        validate: (rolesValue) => {
          return Boolean(rolesValue.length) || "Debe al menos tener 1 rol";
        },
      }),
    },
  };

  const checkBoxInputObject = {
    label: "ACTIVE:",
    name: "active",
    register: {
      ...register("active"),
    },
  };

  return (
    <>
      <form className="form" onSubmit={(e) => e.preventDefault()} noValidate>
        <EditFormHeader
          title={formTitle}
          onSave={handleSubmit(onSaveUser)}
          onDelete={onDeleteUser}
        />
        <TextField inputObject={usernameInputObject} errors={errors} />
        <TextField inputObject={passwordInputObject} errors={errors} />
        <CheckBoxField inputObject={checkBoxInputObject} errors={errors} />
        <SelectField
          selectObject={selectInputObject}
          options={SelectRolesOptions(USERS_ROLES)}
          errors={errors}
        />
      </form>
    </>
  );
};

export default EditUserForm;
