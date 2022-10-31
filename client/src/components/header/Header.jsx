import HeaderButton from "../buttons/HeaderButton.jsx";
import SearchBar from "./SearchBar.jsx";
import ThemeButton from "../buttons/ThemeButton.jsx";
import LoginModal from "../modal/Login.jsx";
import SignupModal from "../modal/Signup.jsx";
import { useState } from "react";

export default function Header() {
  const [logIn, setLogin] = useState(true);
  const [darkMode] = useState(true);
  const [modalOpen, setModalOpen] = useState({
    login: false,
    signup: false,
  });

  const openModalHandler = el => {
    let temp = el.target.id;
    let change = !modalOpen[temp];
    console.log(temp);
    if (!logIn) {
      setModalOpen({ ...modalOpen, [temp]: change });
    } else if (logIn) {
      setLogin(false);
    }
    console.log(temp);
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
            <HeaderButton openModalHandler={openModalHandler} name="로그아웃" />
          )}
          {modalOpen.signup ? <SignupModal /> : null}
        </div>
      </div>
    </>
  );
}
