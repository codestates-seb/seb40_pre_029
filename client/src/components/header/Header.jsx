import HeaderButton from "../buttons/HeaderButton.jsx";
import SearchBar from "./SearchBar.jsx";
import ThemeButton from "../buttons/ThemeButton.jsx";
import { useState } from "react";

export default function Header() {
  const { logIn } = useState(true);
  const { darkMode } = useState(true);
  return (
    <>
      <div className="h-1 bg-emerald-500"></div>
      <div className="px-4 h-16 bg-slate-100 flex flex-row items-center">
        <img src={require("../images/stack_overflow.png")} alt="" className="inline-block w-48 mb-2" />
        <SearchBar />
        {darkMode ? <ThemeButton theme="dark_mode" /> : <ThemeButton theme="light_mode" />}
        {!logIn ? <HeaderButton name="로그인" /> : <HeaderButton name="마이페이지" />}
        {!logIn ? <HeaderButton name="회원가입" /> : <HeaderButton name="로그아웃" />}
      </div>
    </>
  );
}
