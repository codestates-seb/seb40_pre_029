import HeaderButton from "../buttons/HeaderButton.jsx";
import SearchBar from "./SearchBar.jsx";
import LoginModal from "../modal/Login.jsx";
import SignupModal from "../modal/Signup.jsx";
import { useState, useRef, useEffect } from "react";
import ThemeButton from "../buttons/ThemeButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../redux/store.jsx";
// import VerifyModal from "../modal/Verify.jsx";

export default function Header() {
  const [darkButton, setDarkButton] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    login: false,
    signup: false,
    myprofile: false,
  });
  const dispatch = useDispatch();
  const logIn = useSelector(state => state.isLogin);
  const token = useSelector(state => state.authorization);
  const navigate = useNavigate();

  const openModalHandler = el => {
    let temp = el.target.id;
    let change = !modalOpen[temp];
    if (!logIn) {
      setModalOpen({ ...modalOpen, [temp]: change });
    } else {
      if (temp === "logout") {
        dispatch(loginActions.logout());
        localStorage.removeItem("refresh");
        localStorage.removeItem("authorization");
        navigate("/");
      } else if (temp === "myprofile") {
        bringmydata();
      }
    }
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

  const bringmydata = async () => {
    //prettier-ignore
    const response = await fetch("/api/auth/member", {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: token },
    });

    let res = response;
    if (!res.ok) {
      return alert("에러가 발생하였습니다");
    } else {
      await res.json().then(data => navigate("/myprofile", { state: data }));
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 shadow">
      <div className="h-1 bg-emerald-500"></div>
      <div className="bg-slate-100 dark:bg-slate-900 dark:text-gray-400">
        <div className="xl:w-[80rem] max-xl:w-full mx-auto px-4 h-16 flex flex-row items-center ">
          <button onClick={handleHomeClick} className="flex-none">
            <img src={require("../images/stack_overflow.png")} alt="" className="inline-block w-48 mb-2" />
          </button>
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
              <HeaderButton name="마이페이지" id="myprofile" openModalHandler={openModalHandler} />
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
      {modalOpen.login ? <LoginModal userMenu={userMenu} setModalOpen={setModalOpen} /> : null}
      {modalOpen.signup ? <SignupModal userMenu={userMenu} /> : null}
      {/* {modalOpen.myprofile ? <VerifyModal userMenu={userMenu} /> : null} */}
    </div>
  );
}
