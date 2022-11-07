import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState("");
  const onKeyPress = e => {
    if (e.key == "Enter") {
      e.preventDefault();
      console.log(`검색어: ${keywords}`);
      navigate(`/search?search=${keywords}`);
      // navigate("/search-result");
    }
  };

  return (
    <form className="grow min-w-40 ml-8 mr-4 relative">
      <span className="material-icons absolute left-3 h-10 leading-10 text-emerald-500 text-3xl">search</span>
      <input
        type="text"
        className="flex w-full h-10 pr-4 pl-12 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500 dark:bg-slate-800"
        value={keywords}
        placeholder="Search.."
        onChange={e => {
          console.log(e.target.value);
          // console.log(keywords);
          setKeywords(e.target.value);
        }}
        onKeyPress={onKeyPress}
      />
    </form>
  );
}
