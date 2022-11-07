import Darkmode from "../header/Darkmode.jsx";

export default function ThemeButton({ icon, setDarkButton, darkButton }) {
  return (
    <button
      className="h-12 w-12 material-symbols-outlined "
      onClick={() => {
        Darkmode();
        setDarkButton(!darkButton);
      }}>
      {icon}
    </button>
  );
}
