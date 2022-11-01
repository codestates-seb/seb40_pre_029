import { useState } from "react";
import Tags from "../buttons/Tags.jsx";

export default function Dropdown({ icon }) {
  const [active, setActive] = useState(false);
  const [tags, setTags] = useState([
    { name: "Javascript", select: false },
    { name: "Python", select: false },
    { name: "Java", select: false },
    { name: "C++", select: false },
    { name: "CSS", select: false },
    { name: "AWS", select: false },
    { name: "AI", select: false },
    { name: "Open", select: false },
  ]);
  const handleClick = index => {
    setTags(prev =>
      prev.map((it, i) => {
        let cur = !it.select;
        if (i === index) return { ...it, select: cur };
        else {
          return it;
        }
      }),
    );
  };

  return (
    <div className="items-start w-full">
      <button
        className="font-medium w-full h-11 text-left px-3 group/button hover:bg-slate-100 border-r-4 border-white hover:border-r-4 hover:border-emerald-500 flex justify-between items-center"
        onClick={() => setActive(!active)}>
        <div className="flex items-center text-gray-500 group-hover/button:text-gray-800">
          <span className="material-icons mr-2 text-2xl mt-1 text-slate-400 group-hover/button:text-gray-500">
            {icon}
          </span>
          Tags
        </div>
        <img
          src={require("../images/caret-down-regular-24.png")}
          alt=""
          className={!active ? "-rotate-90 inline-block w-4 ml-2" : "rotate-90 inline-block w-4 ml-2"}
        />
      </button>
      <div className={!active ? "p-3 mt-2 border-gray-300 border-l border-t border-b bg-gray-50" : "hidden"}>
        {tags.map((tag, index) => (
          <Tags key={index} tag={tag} icon="add" onClick={() => handleClick(index)} />
        ))}
      </div>
    </div>
  );
}
