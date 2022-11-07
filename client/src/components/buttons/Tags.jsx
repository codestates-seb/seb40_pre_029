/* eslint-disable jsx-a11y/no-static-element-interactions */
export default function Tags({ tag, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group/tag text-sm flex items-center justify-between w-full bg-white py-1 pr-2 pl-1 rounded mb-1 border border-gray-300 hover:bg-green-200 text-gray-500 dark:bg-slate-900 dark:text-gray-400">
      <span
        className={
          tag.select
            ? "text-white px-2 pt-0.5 pb-1 bg-green-600 rounded"
            : "mb-0.5 px-2 font-medium group-hover/tag:text-green-700 "
        }>
        {tag.name}
      </span>
      <span
        className={
          tag.select
            ? "material-icons text-lg text-emerald-700 font-medium"
            : "material-icons text-lg font-medium group-hover/tag:text-green-700"
        }>
        {tag.select ? "remove" : "add"}
      </span>
    </button>
  );
}
