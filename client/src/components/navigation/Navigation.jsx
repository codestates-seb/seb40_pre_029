import AskButton from "../buttons/AskButton.jsx";
import Donate from "../buttons/Donate.jsx";
import Dropdown from "../buttons/Dropdown.jsx";

export default function Navigation() {
  return (
    <>
      <div className="flex flex-col grow items-center h-screen w-40 border-r">
        <div className="pb-5 pt-10">
          <AskButton />
        </div>
        <div className="flex justify-start grow">
          <Dropdown />
        </div>
        <div className="pb-10 pt-5">
          <Donate />
        </div>
      </div>
    </>
  );
}
