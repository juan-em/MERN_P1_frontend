import { useEffect } from "react";
import { useRef } from "react";
import { TextField } from "../FormComponents";

const LoginForm = ({ form, onSubmit }) => {
  const { register, handleSubmit, formState, setFocus } = form;
  const { errors } = formState;

  const usernameInputObject = {
    label: "Username:",
    name: "username",
    type: "text",
    register: {
      ...register("username", {
        required: {
          value: true,
          message: "Username is required",
        },
      }),
    },
  };

  const passwordInputObject = {
    label: "Password:",
    name: "password",
    type: "password",
    register: {
      ...register("password", {
        required: {
          value: true,
          message: "Password is required",
        },
      }),
    },
  };

  //just to focus the field username
  useEffect(()=>{
    setFocus('username')
  },[])

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField inputObject={usernameInputObject} errors={errors} />
      <TextField inputObject={passwordInputObject} errors={errors} />
      <button className="form__submit-button">Sign In</button>
    </form>
  );
};
export default LoginForm;
