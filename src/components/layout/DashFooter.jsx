import GoHomeButton from "../buttons/GoHomeButton";

const DashFooter = () => {
  return (
    <footer className="dash-footer">
      <GoHomeButton/>
      <p>Current user:</p>
      <p>Status:</p>
    </footer>
  );
};

export default DashFooter;
