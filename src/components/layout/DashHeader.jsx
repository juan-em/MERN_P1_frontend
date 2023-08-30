import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSendLogoutMutation } from "../../app/api/auth/authApiSlice";
import { Error } from "../errors/Error";
import { LogoutButton } from "../buttons/LogoutButton";
import useAuth from "../../hooks/useAuth/useAuth";
import { NewNoteButton, NewUserButton, NotesButton, UsersButton } from "../buttons/HeaderButtons";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isManager, isAdmin } = useAuth();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  if (isError) return <Error error={error} />;
  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const onLogoutClicked = () => sendLogout();
  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUsersClicked = () => navigate("/dash/users");

  const showNewNoteLink = NOTES_REGEX.test(pathname)
  const showNewUserLink = USERS_REGEX.test(pathname)
  const showNotesLink = !NOTES_REGEX.test(pathname) && pathname.includes('/dash')
  const showUsersLink = (isManager || isAdmin) && (!USERS_REGEX.test(pathname) && pathname.includes('/dash'))

  useEffect(() => {
    if (isSuccess) {
      console.log("hola");
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <>
    {isLoading ? <p>logging out...</p> :
    <>
    {isError && <Error error={error}/>}
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">Future Notes</h1>
        </Link>
        <nav className="dash-header__nav">
          {showNewNoteLink && <NewNoteButton onClick={onNewNoteClicked} />}
          {showNewUserLink && <NewUserButton onClick={onNewUserClicked} />}
          {showNotesLink && <NotesButton onClick={onNotesClicked} />}
          {showUsersLink && <UsersButton onClick={onUsersClicked} />}
          <LogoutButton onLogout={onLogoutClicked} />
        </nav>
      </div>
    </header>
    
    </>}
    </>
  );
};

export default DashHeader;
