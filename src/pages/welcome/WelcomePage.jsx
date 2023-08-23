import { Link } from "react-router-dom";
import useTimeZone from "../../hooks/useTimeZone/useTimeZone";

const WelcomePage = () => {
  const { formattedDate } = useTimeZone();
  const currentDate = formattedDate(new Date())
  return (
    <section className="welcome">
      <p>{currentDate}</p>
      <h1>Welcome!</h1>
      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/users">View User Settings</Link>
      </p>
    </section>
  );
};

export default WelcomePage;
