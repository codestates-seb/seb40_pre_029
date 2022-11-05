// import Header from "../components/header/Header.jsx";
// import Footer from "../components/footer/Footer.jsx";
// import Navigation from "../components/navigation/Navigation.jsx";
import OptoutModal from "../components/modal/Optout.jsx";
import { useState } from "react";

const MyProfile = () => {
  const [optoutcheck, setOptoutCheck] = useState(false);
  const [editcheck, setEditCheck] = useState(false);

  function openModalHandler(el) {
    let id = el.target.id;
    if (id === "optout") setOptoutCheck(!optoutcheck);
    if (id === "edit") setEditCheck(!editcheck);
    if (id === "cancel") setEditCheck(false);
    if (id === "editdone") editProcess;
  }

  const editProcess = async data => {
    data.preventDefault();
    let info = {
      email: data.target[0].value,
      nickname: data.target[1].value,
      password: data.target[2].vaule,
    };

    //prettier-ignore
    const response = await fetch("/login", {
      method: "POST",
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
            {editcheck ? (
              <input className="text-sm rounded w-full p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></input>
            ) : (
              <h1 className="items-center flex text-2xl mt-1">DummyData</h1>
            )}
          </div>
          <div className="flex justify-between h-16 pl-14 mb-4">
            <h1 className="items-center flex text-2xl mt-1 font-medium">Nickname</h1>
            {/* 여기에 입력받는 닉네임 추가 */}
            {editcheck ? <input></input> : <h1 className="items-center flex text-2xl mt-1">DummyData</h1>}
          </div>
          {editcheck ? (
            <div>
              <div className="flex justify-between h-16 pl-14 mb-4">
                <h1 className="items-center flex text-2xl mt-1 font-medium">Password Change</h1>
                <input className="text-sm rounded w-full p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></input>
              </div>
              <div className="flex justify-between h-16 pl-14 mb-4">
                <h1 className="items-center flex text-2xl mt-1 font-medium">Confirm Password</h1>
                <input></input>
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
      {optoutcheck ? <OptoutModal /> : null}
    </>
  );
};

export default MyProfile;
