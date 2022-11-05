import Darkmode from "../header/Darkmode.jsx";

export default function ThemeButton({ icon }) {
  return (
    <button className="h-12 w-12 material-symbols-outlined " onClick={Darkmode}>
      {icon}
    </button>
  );
}
