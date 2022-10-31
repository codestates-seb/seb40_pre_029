export default function Tags({ tag, active, onClick }) {
  return (
    <div onClick={onClick} className={active ? "flex justify-center text-xs" : "hidden"}>
      <button className={tag.select ? "font-bold pl-2" : "pl-2"}>{tag.name}</button>
    </div>
  );
}
