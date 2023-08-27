import { useEffect } from "react";
import usePersist from "../../../hooks/usePersist/usePersist";
import { TextField } from "../FormComponents";


const LoginForm = ({ form, onSubmit }) => {
  const { register, handleSubmit, formState, setFocus } = form;
  const { errors } = formState;
  const [persist, setPersist] = usePersist()

  const handleToggle = () => setPersist(prev => !prev)

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
      <label htmlFor="persist" className="form__persist">
        <input
          type="checkbox"
          className="form__checkbox"
          id="persist"
          onChange={handleToggle}
          checked={persist}
        />
        Trust this device
      </label>
      <button className="form__submit-button">Sign In</button>
    </form>
  );
};
export default LoginForm;
