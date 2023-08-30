import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import useTimeZone from "../../hooks/useTimeZone/useTimeZone";

const WelcomePage = () => {
  const { formattedDate } = useTimeZone();
  const { username, isManager, isAdmin } = useAuth()

  const currentDate = formattedDate(new Date());
  return (
    <section className="welcome">
      <p>{currentDate}</p>
      <h1>Welcome! {username}</h1>
      <p> <Link to="/dash/notes">View techNotes</Link> </p>
      <p> <Link to="/dash/notes/new">Add New techNote</Link> </p>
      {(isManager || isAdmin) && <p> <Link to="/dash/users">View User Settings</Link> </p>}
      {(isManager || isAdmin) && <p> <Link to="/dash/users/new">Add New User</Link> </p>}
    </section>
  );
};

export default WelcomePage;
