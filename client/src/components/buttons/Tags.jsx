/* eslint-disable jsx-a11y/no-static-element-interactions */
export default function Tags({ tag, active, onClick }) {
  return (
    <div className={active ? "flex justify-center text-xs" : "hidden"}>
      <button onClick={onClick} className={tag.select ? "font-bold pl-2" : "pl-2"}>
        {tag.name}
      </button>
    </div>
  );
}
