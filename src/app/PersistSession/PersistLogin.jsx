import { useEffect, useState, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "../api/auth/authApiSlice";
import { useSelector } from "react-redux";
import usePersist from "../../hooks/usePersist/usePersist";
import { selectCurrentToken } from "../api/auth/authSlice";
import { Error } from "../../components/errors/Error";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

    console.log('hol')

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          const response = await refresh();
          console.log(response);
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };
      if (!token && persist) {
        verifyRefreshToken();
      }
    }
    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {                           // persist: no   
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {                   // persist: yes, token: no
    console.log("loading...");
    content = <p>Loading...</p>;
  } else if (isError) {                     // persist: yes, token: no
    console.log(error);
    content = (
      <Error error={error}>
        <br></br>
        <Link to="/login">
            Please login again
        </Link>
      </Error>
    );
  } else if (isSuccess && trueSuccess) {    // persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {    // persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <Outlet/>
  }

  return content;
};

export default PersistLogin;
