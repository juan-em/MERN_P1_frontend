import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const GoHomeButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onGoHomeClicked = () => navigate("/dash");

  return pathname !== "/dash" && 
  (
    <button
      className="dash-footer__button icon-button"
      title="Home"
      onClick={onGoHomeClicked}
    >
      <FontAwesomeIcon icon={faHouse} />
    </button>
  )
}

export default GoHomeButton