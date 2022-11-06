import { useNavigate } from "react-router-dom";

export default function NavigationDefault({ name, icon }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <button
      onClick={onClick}
      className="group/button font-medium text-gray-500 hover:text-gray-600 hover:bg-slate-100 hover:border-r-4 hover:border-emerald-500 w-full h-11 leading-11 text-left px-3 flex items-center dark:bg-slate-900 dark:text-gray-400 dark:hover:text-gray-600 ">
      <span className="material-icons mr-2 text-2xl mt-1 text-slate-400 group-hover/button:text-gray-500 dark:bg-slate-900 ">
        {icon}
      </span>
      {name}
    </button>
  );
}
