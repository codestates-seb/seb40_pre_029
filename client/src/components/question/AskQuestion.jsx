//질문하기 버튼을 누르면 보이는 창이다.
// /ask [POST] => { title , body , tags }
// /edit [PATCH]
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tag from "./Tag.jsx";

const AskQuestion = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState({ title: "", article: "", tagList: [] });
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [tagList, setTagList] = useState([]);

  const postData = async question => {
    await fetch("/question/post", {
      method: "POST",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "skip" },
      body: JSON.stringify(question),
    }).then(res => console.log(res));
  };

  const onPostClick = () => {
    postData(question);
    navigate("/");
    console.log(question);
  };

  const handleOnChange = e => {
    setArticle(e.target.value);
    setQuestion({ title, article: e.target.value, tagList });
  };

  return (
    <div className="flex flex-col bg-#F8F9F9 w-2/5">
      <section>
        <form
          className="question-title-container border-2 border-#E3E6E8 w-full mb-12 rounded"
          onSubmit={e => e.preventDefault()}>
          <div className="p-4 bg-#FFFFFF">
            <div className="p-1">Title</div>
            <div className="p-1 text-xs">Be specific and imagine you’re asking a question to another person.</div>
            <input
              className="question-title text-sm rounded w-full p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"
              onChange={e => setTitle(e.target.value)}
              value={title}
              required
              placeholder="e.g Is there an R funtion for finding the index of an element in a vector?"></input>
          </div>
        </form>
        <form className="border-2 border-#E3E6E8 w-full mb-12 rounded">
          <div className="p-4 bg-#FFFFFF ">
            <div className="p-1">Body</div>
            <div className="p-1 text-xs">
              The body of your question contains your problem details and results. Minimum 30 characters.
            </div>
            <textarea
              onChange={handleOnChange}
              value={article}
              rows={12}
              className="question-body w-full p-2 bg-#F1F2F3 rounded border border-gray-400 resize-y border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500 "></textarea>
          </div>
        </form>
        <Tag setTagList={setTagList} />
        <button
          className="question-post p-2 mb-4 rounded border-none text-slate-50 bg-sky-500 shadow-blue-500/50 shadow w-36 h-12 text-sm"
          onClick={onPostClick}>
          Post your question
        </button>
      </section>
    </div>
  );
};

export default AskQuestion;
