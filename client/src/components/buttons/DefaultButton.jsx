import { useNavigate, useParams } from "react-router-dom";

export default function DefaultButton({ name, data }) {
  const navigate = useNavigate();
  const params = useParams();
  const askOnClick = () => {
    navigate("/ask");
  };

  // const postData = async answerData => {
  //   await fetch("/answer/post", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(answerData),
  //   }).then(res => console.log(res));
  // };
  //댓글 남기기 버튼을 누르면 comment data post 요청함

  const postOnClick = () => {
    let answerData = {
      article: data,
      questionId: params.id,
    };
    fetch("/answer/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answerData),
    });
    window.location.reload();
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
