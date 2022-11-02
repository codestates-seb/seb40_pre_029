import Donate from "../buttons/Donate.jsx";
import Dropdown from "../buttons/Dropdown.jsx";
import NavigationDefault from "../buttons/NavigationDefault.jsx";
// import DefaultButton from "../buttons/DefaultButton.jsx";

export default function Navigation() {
  return (
    <>
      <div className="flex flex-col justify-between w-80 border-r border-gray-300 py-4">
        <div>
          <NavigationDefault name="Questions" icon="public" />
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
