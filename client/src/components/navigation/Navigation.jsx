import Donate from "../buttons/Donate.jsx";
import Dropdown from "../buttons/Dropdown.jsx";
import NavigationDefault from "../buttons/NavigationDefault.jsx";
// import DefaultButton from "../buttons/DefaultButton.jsx";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const onClick = () => {
    const navigate = useNavigate();
    navigate("/");
  };
  return (
    <>
      <div className="flex flex-none flex-col justify-between w-48 max-xl:w-64 border-r border-gray-300 pt-4 dark:bg-slate-900 dark:text-gray-400 ">
        <div>
          <NavigationDefault name="Questions" icon="public" onClick={onClick} />
          <NavigationDefault name="Users" icon="group" />
          <NavigationDefault name="Companies" icon="apartment" />
          <Dropdown icon="tag" />
        </div>
        <div className="pr-4 max-xl:px-4">
          <Donate />
        </div>
      </div>
    </>
  );
}
