import { useState } from "react";

export default function SearchBar() {
  const [keywords, setKeywords] = useState("");
  console.log(keywords);
  return (
    <form className="grow min-w-40 ml-10 mr-4 relative">
      <span className="material-icons absolute left-3 h-10 leading-10 text-emerald-500 text-3xl">search</span>
      <input
        type="text"
        className="flex w-full h-10 pr-4 pl-12 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"
        value={keywords}
        placeholder="Search.."
        onChange={e => {
          setKeywords(e.target.value);
        }}
      />
    </form>
  );
}
