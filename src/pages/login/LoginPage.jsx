import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/api/auth/authSlice";
import { useLoginMutation } from "../../app/api/auth/authApiSlice";

import LoginForm from "../../components/forms/login/LoginForm";
import { Error } from "../../components/errors/Error";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const form = useForm();

  const onSubmit = async (data) => {
    // await login(data);
    const { accessToken } = await login(data).unwrap();
    dispatch(setCredentials({ accessToken }));
  };

  useEffect(() => {
    if (isSuccess) navigate("/dash");
  }, [isSuccess]);

  return (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        {isError && <Error error={error} />}
        <LoginForm form={form} onSubmit={onSubmit} />
        {isLoading && <p>Logging...</p>}
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
};

export default LoginPage;
