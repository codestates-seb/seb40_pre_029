/* eslint-disable jsx-a11y/no-static-element-interactions */
export default function Tags({ tag, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-sm flex items-center justify-between w-full bg-white py-1 pr-2 pl-1 rounded mb-1 border border-gray-300 hover:bg-green-100 text-gray-500">
      <span className={tag.select ? "text-white font-medium px-3 pt-0.5 pb-1 bg-emerald-500 rounded" : "mb-0.5 px-2"}>
        {tag.name}
      </span>
      <span
        className={
          tag.select ? "material-icons text-lg text-emerald-700 font-medium" : "material-icons text-lg font-medium"
        }>
        {tag.select ? "remove" : "add"}
      </span>
    </button>
  );
}
