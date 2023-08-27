import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSendLogoutMutation } from "../../app/api/auth/authApiSlice";
import { Error } from "../errors/Error";
import { LogoutButton } from "../buttons/LogoutButton";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const onLogoutClicked = () => sendLogout();
  if (isError) return <Error error={error} />;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  useEffect(() => {
    if (isSuccess) {
      console.log("hola");
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">Future Notes</h1>
        </Link>
        <nav className="dash-header__nav">
          {isLoading && <p>logging out...</p>}
          <LogoutButton onLogout={onLogoutClicked} />
        </nav>
      </div>
    </header>
  );
};

export default DashHeader;
