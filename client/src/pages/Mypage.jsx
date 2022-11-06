import OptoutModal from "../components/modal/Optout.jsx";
import { useState, useRef, useEffect } from "react";

const MyProfile = state => {
  const [optoutcheck, setOptoutCheck] = useState(false);
  const [editcheck, setEditCheck] = useState(false);
  const [pw, isPW] = useState({
    pw: "",
    pwc: "",
    pwsame: false,
  });
  const pwpattern = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$");
  const userMenu = useRef(null);
  const modalCloseHandler = ({ target }) => {
    if (typeof userMenu.current === "undefined" || userMenu.current === null) {
      return;
    } else if (!userMenu.current.contains(target)) {
      setOptoutCheck(false);
      console.log(optoutcheck);
    }
  };

  const onChange = async ele => {
    const { value, name } = ele.target;
    //prettier-ignore

    if (pwpattern.test(value)) {
      isPW({
        ...pw,
        [name]: value,
      });
    }
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
    if (id === "editdone") editProcess;
  }

  const editProcess = async data => {
    data.preventDefault();
    let info = {};
    let nickname = data.target[0].value;
    let pw = data.target[1].vaule;
    let pwc = data.target[1].vaule;
    if (nickname) info.nickname = nickname;
    if (pw && pw === pwc) info.password = pw;

    //prettier-ignore
    const response = await fetch("/api/auth/member", {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(info),
      })
    let res = response;
    if (!res.ok) {
      await res.json().then(data => alert(data));
    } else {
      await res.json().then(data => console.log(data));
      alert("로그인이 완료되었습니다");
      console.log(res.headers.get("refresh"));
      console.log(response.headers.get("authorization"));
      console.log("이렇게하면" + res.headers.refresh);

      // setLogin(true);
      // return location.reload();
    }
  };

  return (
    <>
      <div className="w-4/5 flex bg-slate-300 dark:bg-slate-900 dark:text-gray-400" id="profileheader">
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
              <input className="text-sm rounded w-96 p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></input>
            ) : (
              <h1 className="items-center flex text-2xl mt-1">{state.state.displayName}</h1>
            )}
          </div>
          {editcheck ? (
            <div>
              <div className="flex justify-between h-16 pl-14 mb-4">
                <h1 className="items-center flex text-2xl mt-1 font-medium">Password Change</h1>
                <input
                  name="pw"
                  onChange={onChange}
                  className="text-sm rounded w-96 p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></input>
              </div>
              <div className="flex justify-between h-16 pl-14 mb-4">
                <h1 className="items-center flex text-2xl mt-1 font-medium">Confirm Password</h1>
                <input
                  name="pwc"
                  onChange={onChange}
                  className="text-sm rounded w-96 p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></input>
              </div>
            </div>
          ) : null}
          {pw.pwsame ? (
            <span className="h-5 w-96 mb-1"></span>
          ) : (
            <span className="text-black-500 text-sm h-5 w-96 mb-1">위의 비밀번호와 동일하여야 합니다.</span>
          )}
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
                onClick={openModalHandler}>
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
