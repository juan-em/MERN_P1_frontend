import { useContext } from "react";
import TimeZoneContext from "../../contexts/TimeZoneContext/TimeZoneContext";

const useTimeZone = () => {
  const { timeZone, setTimeZone, formattedDate } = useContext(TimeZoneContext);

  // Extra logic

  return {
    timeZone,
    setTimeZone,
    formattedDate
  };
};

export default useTimeZone;