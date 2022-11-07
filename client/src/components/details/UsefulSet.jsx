import ArrowDropDown from "../buttons/ArrowDropDown.jsx";
import ArrowDropUp from "../buttons/ArrowDropUp.jsx";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function UsefulSet(questionid, likes) {
  const token = useSelector(state => state.authorization);
  const qid = questionid.questionid;
  const [numlikes, setNumlikes] = useState("");
  console.log(numlikes);
  const buttonClick = el => {
    let redir = el.target.id;
    if (redir === "upbutton") postLikes(1);
    if (redir === "downbutton") postLikes(0);
  };

  const postLikes = async num => {
    const response = await fetch("/api/auth/likes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({
        likeId: qid,
        likes: num,
      }),
    });

    let res = response;
    if (!res.ok) {
      return alert("에러가 발생하였습니다");
    } else {
      await res.json().then(data => console.log(data));
    }
  };

  useEffect(() => {
    if (isNaN(likes)) setNumlikes(likes);
    else setNumlikes("-");
  }, []);

  return (
    <div className="flex flex-col">
      <ArrowDropUp fill="#babfc4" onClick={buttonClick} />
      <div className="text-center text-3xl my-3">0</div>
      <ArrowDropDown fill="#babfc4" onClick={buttonClick} />
      <span className="material-symbols-outlined text-center text-3xl text-gray-300 my-1">bookmark</span>
      <span className="material-icons text-center text-3xl text-gray-300 my-1">history</span>
    </div>
  );
}
