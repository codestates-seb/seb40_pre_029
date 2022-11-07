import { useNavigate, useParams } from "react-router-dom";

export default function DefaultButton({ name, data, editData, answerEdit }) {
  const token = localStorage.getItem("authorization");
  const navigate = useNavigate();
  const params = useParams();
  const askOnClick = () => {
    navigate("/ask");
  };
  const postOnClick = () => {
    if (!answerEdit) {
      let answerData = {
        article: data,
        questionId: params.id,
      };
      fetch("/api/auth/answer/post", {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify(answerData),
      }).then(res => console.log(res));
      window.location.reload();
    } else {
      let answerData = {
        article: editData.article,
        answerId: editData.answerId,
      };
      console.log(answerData);
      fetch("/api/auth/answer/patch", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify(answerData),
      }).then(res => console.log(res));
      window.location.reload();
    }
  };
  if (name === "Post Your Answer") {
    return (
      <button
        onClick={postOnClick}
        className="px-6 pb-1 shadow-sky-400 shadow-tline border border-sky-500 h-12 min-w-36 bg-blue-500 rounded text-white">
        <span>{name}</span>
      </button>
    );
  } else {
    return (
      <button
        onClick={askOnClick}
        className="px-6 pb-1 shadow-sky-400 shadow-tline border border-sky-500 h-12 min-w-36 bg-blue-500 rounded text-white">
        <span>{name}</span>
      </button>
    );
  }
}
