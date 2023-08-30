import GoHomeButton from "../buttons/GoHomeButton";
import useAuth from "../../hooks/useAuth/useAuth";

const DashFooter = () => {

  const { username, status } = useAuth()
  return (
    <footer className="dash-footer">
      <GoHomeButton/>
      <p>Current user: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );
};

export default DashFooter;
