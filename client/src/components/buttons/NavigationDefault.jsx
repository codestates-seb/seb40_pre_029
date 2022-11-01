export default function NavigationDefault({ name, icon }) {
  return (
    <button className="font-medium text-gray-500 hover:text-emerald-700 hover:bg-slate-100 hover:border-r-4 hover:border-emerald-500 w-full h-11 leading-11 text-left px-4 flex items-center">
      <span className="material-icons mr-2 text-2xl mt-1 text-gray-400">{icon}</span>
      {name}
    </button>
  );
}
