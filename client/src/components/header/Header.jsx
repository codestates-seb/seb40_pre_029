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
  };

  return (
    <>
      <div className="h-1 bg-emerald-500"></div>
      <div className="bg-slate-100 ">
        <div className="lg:w-[80rem] max-lg:w-full mx-auto px-4 h-16 flex flex-row items-center">
          <a href="/">
            <img src={require("../images/stack_overflow.png")} alt="" className="inline-block w-48 mb-2 mr-2" />
          </a>
          <SearchBar />
          {darkMode ? <ThemeButton theme="dark_mode" /> : <ThemeButton theme="light_mode" />}
          <div className="flex h-full text-sm w-20">
            {!logIn ? (
              <HeaderButton name="로그인" id="login" openModalHandler={openModalHandler} />
            ) : (
              <HeaderButton name="마이페이지" />
            )}
          </div>
          <div className="flex h-full text-sm w-20">
            {!logIn ? (
              <HeaderButton name="회원가입" id="signup" openModalHandler={openModalHandler} />
            ) : (
              <HeaderButton openModalHandler={openModalHandler} name="로그아웃" />
            )}
          </div>
        </div>
      </div>
      {modalOpen.login ? <LoginModal /> : null}
      {modalOpen.signup ? <SignupModal /> : null}
    </>
  );
}
