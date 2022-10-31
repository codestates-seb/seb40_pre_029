import { useState } from "react";
import Tags from "../buttons/Tags.jsx";

export default function Dropdown() {
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
    <div className="flex flex-col w-28 pl-5 items-start text-sm text-gray-500">
      <button className="flex justify-center pb-3">Questions</button>
      <button className="flex justify-center pb-3">Users</button>
      <button className="flex justify-center pb-3">Companies</button>
      <button className="flex justify-center pb-3" onClick={() => setActive(!active)}>
        Tags
        <img
          src={import("../images/caret-down-regular-24.png")}
          alt=""
          className={active ? "flex rotate-180 inline-block w-6" : "flex inline-block w-6"}
        />
      </button>
      {tags.map((tag, index) => (
        <Tags key={index} tag={tag} active={active} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
}
