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
      <div className="dark:bg-slate-900 dark:text-gray-400">
        <Header />
        <div className="flex xl:w-[80rem] max-xl:w-full mx-auto dark:bg-slate-900 dark:text-gray-400">
          <Navigation />
          <Mypage />
        </div>
        <Footer />
        <ScrollTop />
      </div>
      {optoutcheck ? <OptoutModal /> : null}
    </>
  );
};

export default MyProfile;
