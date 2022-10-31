import ArrowDropDown from "../buttons/ArrowDropDown.jsx";
import ArrowDropUp from "../buttons/ArrowDropUp.jsx";
export default function UsefulSet() {
  return (
    <div className="flex flex-col">
      <ArrowDropUp fill="#babfc4" />
      <span className="text-center text-3xl my-3">0</span>
      <ArrowDropDown fill="#babfc4" />
      <span className="material-symbols-outlined text-center text-3xl text-gray-300 my-1">bookmark</span>
      <span className="material-icons text-center text-3xl text-gray-300 my-1">history</span>
    </div>
  );
}
