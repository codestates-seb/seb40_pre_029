import { useNavigate } from "react-router-dom";

export default function AskButton() {
  const navigate = useNavigate();
  const askOnClick = () => {
    navigate("/ask");
  };

  return (
    <button
      onClick={askOnClick}
      className="flex justify-center items-center rounded h-10 w-24 bg-sky-500 shadow-blue-500/50 min-w-min shadow text-white text-xs">
      Ask Questions
    </button>
  );
}
