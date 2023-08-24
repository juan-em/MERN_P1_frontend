import { USERS_ROLES, USER_PWD_REGEX, USER_REGEX } from "../../../constants/userConstants";
import { TextField, SelectField, NewFormHeader, SelectRolesOptions } from "../FormComponents";

const UserCreationForm = ({ form, onSubmit }) => {
  const { register, handleSubmit, formState } = form
  const { errors } = formState;

  const formTitle = "New User";

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
    description: "[4-12 chars incl. !@#$%]",
    register: {
      ...register("password", {
        required: {
          value: true,
          message: "Password is required",
        },
        pattern: {
          value: USER_PWD_REGEX,
          message: "Invalid password format",
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

  return (
    <>
    {/* <DevTool control={control} /> */}
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <NewFormHeader title={formTitle} />
        <TextField inputObject={usernameInputObject} errors={errors} />
        <TextField inputObject={passwordInputObject} errors={errors} />
        <SelectField
          selectObject={selectInputObject}
          options={SelectRolesOptions(USERS_ROLES)}
          errors={errors}
        />
      </form>
    </>
  );
};

export default UserCreationForm;
