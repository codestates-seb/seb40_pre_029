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
  }

  return (
    <>
      {/* <Header />
      <div className="flex">
        <Navigation className="w-1/5" /> */}
      <div className="w-4/5 flex" id="profileheader">
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
            {editcheck ? <input></input> : <h1 className="items-center flex text-2xl mt-1">DummyData</h1>}
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
                <input></input>
              </div>
              <div className="flex justify-between h-16 pl-14 mb-4">
                <h1 className="items-center flex text-2xl mt-1 font-medium">Confirm Password</h1>
                <input></input>
              </div>
            </div>
          ) : null}
          <div className="flex flex-row-reverse h-20">
            <button
              className="mx-2 p-1 pb-4 h-10 rounded border-2 border border-gray-500 text-gray-500 hover:bg-green-200"
              // group/tag text-sm flex items-center justify-between w-full bg-white   mb-1
              id="optout"
              onClick={openModalHandler}>
              Opt out
            </button>
            {editcheck ? (
              <button
                className="mx-2 p-1 px-4 pb-4 h-10 rounded-md border-2 border-black"
                id="edit"
                onClick={openModalHandler}>
                Edit
              </button>
            ) : (
              <button
                className="mx-2 p-1 pb-4 h-10 rounded-md border-2 border-black"
                id="edit"
                onClick={openModalHandler}>
                Edit my info
              </button>
            )}
          </div>
        </section>
      </div>
      {/* </div>
      <Footer /> */}
      {optoutcheck ? <OptoutModal /> : null}
    </>
  );
};

export default MyProfile;
