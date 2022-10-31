import HeaderButton from "../buttons/HeaderButton.jsx";
import SearchBar from "./SearchBar.jsx";
import ThemeButton from "../buttons/ThemeButton.jsx";
import { useState } from "react";

export default function Header() {
  const [logIn] = useState(false);
  const [darkMode] = useState(true);
  const [modalOpen, setModalOpen] = useState({
    login: false,
    signup: false,
  });

  const openModalHandler = el => {
    console.log(el.target.id);
    let temp = el.target.id;
    setModalOpen(!modalOpen.temp);
    if (modalOpen.login === true) {
      modalOpen.signup === false;
    } else if (modalOpen.signup === true) {
      modalOpen.login === false;
    }
  };

  return (
    <>
      <div className="h-1 bg-emerald-500"></div>
      <div className="px-4 h-16 bg-slate-100 flex flex-row items-center">
        <img src={require("../images/stack_overflow.png")} alt="" className="inline-block w-48 mb-2" />
        <SearchBar />
        {darkMode ? <ThemeButton theme="dark_mode" /> : <ThemeButton theme="light_mode" />}
        <div className="flex flex-col">
          {!logIn ? (
            <HeaderButton name="로그인" id="login" openModalHandler={openModalHandler} />
          ) : (
            <HeaderButton name="마이페이지" />
          )}
          {modalOpen.login ? <LoginModal /> : null}
        </div>
        <div className="flex flex-col">
          {!logIn ? (
            <HeaderButton name="회원가입" id="signup" openModalHandler={openModalHandler} />
          ) : (
            <HeaderButton name="로그아웃" />
          )}
          {modalOpen.signup ? <LoginModal /> : null}
        </div>
      </div>
    </>
  );
}
