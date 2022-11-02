import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function DefaultButton({ name }) {
  const navigate = useNavigate();
  const askOnClick = () => {
    navigate("/ask");
  };
  DefaultButton.propTypes = {
    name: PropTypes.string,
  };
  return (
    <button
      onClick={askOnClick}
      className="px-6 pb-1 shadow-sky-300 shadow-tline border border-sky-500 h-12 min-w-36 bg-blue-500 rounded text-white">
      <span>{name}</span>
    </button>
  );
}
