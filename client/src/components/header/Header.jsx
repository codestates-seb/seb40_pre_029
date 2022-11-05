import HeaderButton from "../buttons/HeaderButton.jsx";
import SearchBar from "./SearchBar.jsx";
import LoginModal from "../modal/Login.jsx";
import SignupModal from "../modal/Signup.jsx";
import { useState, useRef, useEffect } from "react";
import ThemeButton from "../buttons/ThemeButton.jsx";

export default function Header() {
  const [logIn, setLogin] = useState(false);
  const [darkButton, setDarkButton] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    login: false,
    signup: false,
  });

  const openModalHandler = el => {
    let temp = el.target.id;
    let change = !modalOpen[temp];
    if (!logIn) {
      setModalOpen({ ...modalOpen, [temp]: change });
    } else if (logIn && temp === "logout") {
      setLogin(false);
    }
  };

  const closeLogin = () => {
    setModalOpen({ ...modalOpen, login: false });
  };

  const userMenu = useRef(null);
  // console.log(userMenu);

  const modalCloseHandler = ({ target }) => {
    if (typeof userMenu.current === "undefined" || userMenu.current === null) {
      return;
    } else if (!userMenu.current.contains(target)) setModalOpen({ login: false, signup: false });
  };

  useEffect(() => {
    window.addEventListener("mousedown", modalCloseHandler);
    return () => {
      window.removeEventListener("mousedown", modalCloseHandler);
    };
  });

  return (
    <div className="sticky top-0 z-50 shadow">
      <div className="h-1 bg-emerald-500"></div>
      <div className="bg-slate-100 dark:bg-slate-900 dark:text-gray-400">
        <div className="xl:w-[80rem] max-xl:w-full mx-auto px-4 h-16 flex flex-row items-center ">
          <a href="/" className="flex-none">
            <img src={require("../images/stack_overflow.png")} alt="" className="inline-block w-48 mb-2" />
          </a>
          <SearchBar />
          {darkButton ? (
            <ThemeButton icon="light_mode" darkButton={darkButton} setDarkButton={setDarkButton} />
          ) : (
            <ThemeButton icon="dark_mode" darkButton={darkButton} setDarkButton={setDarkButton} />
          )}

          <div className="flex h-full text-sm w-20 dark:bg-slate-800">
            {!logIn ? (
              <HeaderButton name="로그인" id="login" openModalHandler={openModalHandler} />
            ) : (
              <HeaderButton name="마이페이지" />
            )}
          </div>
          <div className="flex h-full text-sm w-20 dark:bg-slate-800">
            {!logIn ? (
              <HeaderButton
                name="회원가입"
                id="signup"
                openModalHandler={openModalHandler}
                modalOpen={modalOpen}
                onChange={value => setModalOpen({ ...modalOpen, ...value })}
              />
            ) : (
              <HeaderButton openModalHandler={openModalHandler} name="로그아웃" id="logout" />
            )}
          </div>
        </div>
      </div>
      {modalOpen.login ? <LoginModal userMenu={userMenu} closeLogin={closeLogin} setLogin={setLogin} /> : null}
      {modalOpen.signup ? <SignupModal userMenu={userMenu} /> : null}
    </div>
  );
}
