import OptoutModal from "../components/modal/Optout.jsx";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = state => {
  const navigate = useNavigate();
  const [optoutcheck, setOptoutCheck] = useState(false);
  const [editcheck, setEditCheck] = useState(false);
  const [pw, isPW] = useState({
    nickname: "",
    pw: "",
    pwc: "",
    pwsame: false,
  });
  const pwpattern = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$");
  const nicknamepattern = new RegExp("^[a-zA-Z0-9가-힣]+$");

  const userMenu = useRef(null);
  const modalCloseHandler = ({ target }) => {
    if (typeof userMenu.current === "undefined" || userMenu.current === null) {
      return;
    } else if (!userMenu.current.contains(target)) {
      setOptoutCheck(false);
      console.log(optoutcheck);
    }
  };
  const token = useSelector(state => state.authorization);

  const onChange = async ele => {
    const { value, name } = ele.target;
    //prettier-ignore
    isPW({
      ...pw,
      [name]: value,
    });
  };

  useEffect(() => {
    if (pw.pw !== pw.pwc) return isPW({ ...pw, pwsame: false });

    return isPW({ ...pw, pwsame: true });
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", modalCloseHandler);
    return () => {
      window.removeEventListener("mousedown", modalCloseHandler);
    };
  });

  function openModalHandler(el) {
    let id = el.target.id;
    if (id === "optout") setOptoutCheck(true);
    if (id === "edit") setEditCheck(!editcheck);
    if (id === "cancel") setEditCheck(false);
  }

  const editProcess = async data => {
    data.preventDefault();
    let info = {};
    if (pw.pw !== "" && pw.pw !== pw.pwc) {
      alert("비밀번호가 같지 않습니다");
      return;
    }
    if (pw.pw === "" && pw.pwc === "" && pw.nickname === "") {
      alert("입력된 정보가 없습니다");
      return;
    } else {
      if (pw.nickname !== "" && nicknamepattern.test(pw.nickname)) info.displayName = pw.nickname;
      else return alert("닉네임이 형식에 맞지 않습니다(한글,영문,숫자 가능)");
      if (pw.pw !== "") {
        if (pw.pw !== "" && pwpattern.test(pw.pw)) info.password = pw.pw;
        else return alert("비밀번호가 형식에 맞지 않습니다(영문,숫자,특수문자 포함 8-16자)");
      }
    }

    //prettier-ignore
    const response = await fetch("/api/auth/member", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: token},
      body: JSON.stringify(info),
      })
    let res = response;
    if (!res.ok) {
      await res.json().then(alert("문제가 발생하였습니다."));
    } else {
      await res.json().then(data => {
        setEditCheck(!editcheck);
        navigate("/myprofile", { state: data });
      });
    }
  };

  return (
    <>
      <div className="w-4/5 flex dark:bg-slate-900 dark:text-gray-400" id="profileheader">
        <section className="py-8 w-full mr-8">
          <div className="flex justify-between h-16 pl-10 mb-4">
            {editcheck ? (
              <h1 className="items-center flex text-3xl mt-1 font-medium">Edit Profile</h1>
            ) : (
              <h1 className="items-center flex text-3xl mt-1 font-medium">My Profile</h1>
            )}
            {/* 이미지 사진 불러오기, 만약 사진을 못불러오면 기존에 있는 이미지 추가 */}
            <img className="max-w-auto h-auto" src={require("../components/images/temp_profile.png")} alt="" />
          </div>
          <div className="flex justify-between h-16 pl-14 mb-4">
            <h1 className="items-center flex text-2xl mt-1 font-medium">Email</h1>
            {/* 여기에 입력받는 이메일 추가 */}
            <h1 className="items-center flex text-2xl mt-1">{state.state.email}</h1>
          </div>
          <div className="flex justify-between h-16 pl-14 mb-4">
            <h1 className="items-center flex text-2xl mt-1 font-medium">Nickname</h1>
            {/* 여기에 입력받는 닉네임 추가 */}
            {editcheck ? (
              <input
                name="nickname"
                onChange={onChange}
                value={pw.nickname}
                className="text-sm rounded w-96 p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></input>
            ) : (
              <h1 className="items-center flex text-2xl mt-1">{state.state.displayName}</h1>
            )}
          </div>
          {editcheck ? (
            <div>
              <div className="flex justify-between h-16 pl-14 mb-4">
                <h1 className="items-center flex text-2xl mt-1 font-medium">Password Change</h1>
                <input
                  type="password"
                  name="pw"
                  onChange={onChange}
                  value={pw.pw}
                  className="text-sm rounded w-96 p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></input>
              </div>
              <div className="flex justify-between h-16 pl-14 mb-4">
                <h1 className="items-center flex text-2xl mt-1 font-medium">Confirm Password</h1>
                <input
                  type="password"
                  name="pwc"
                  value={pw.pwc}
                  onChange={onChange}
                  className="text-sm rounded w-96 p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></input>
              </div>
            </div>
          ) : null}
          <div className="flex flex-row-reverse h-20">
            {editcheck ? (
              <button
                className="p-2 mb-4 mx-2 rounded border-none text-slate-50 text-sky-500 w-36 h-12 text-sm"
                id="cancel"
                onClick={openModalHandler}>
                Cancel
              </button>
            ) : (
              <button
                className="p-2 mb-4 mx-2 rounded border-none text-slate-50 bg-sky-500 shadow-blue-500/50 shadow w-36 h-12 text-sm"
                // group/tag text-sm flex items-center justify-between w-full bg-white   mb-1
                id="optout"
                onClick={openModalHandler}>
                Opt out
              </button>
            )}
            {editcheck ? (
              <button
                className="p-2 mb-4 mx-2 rounded border-none text-slate-50 bg-sky-500 shadow-blue-500/50 shadow w-36 h-12 text-sm"
                id="editdone"
                onClick={editProcess}>
                Edit
              </button>
            ) : (
              <button
                className="p-2 mb-4 mx-2 rounded border-none text-slate-50 bg-sky-500 shadow-blue-500/50 shadow w-36 h-12 text-sm"
                id="edit"
                onClick={openModalHandler}>
                Edit my info
              </button>
            )}
          </div>
        </section>
      </div>
      {optoutcheck ? <OptoutModal userMenu={userMenu} /> : null}
    </>
  );
};
export default MyProfile;
