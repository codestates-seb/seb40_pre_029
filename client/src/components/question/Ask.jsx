//질문하기 버튼을 누르면 보이는 창이다.
import { useState } from "react";
import Tag from "./Tag.jsx";

const Ask = () => {
  const [question, setQuestion] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onPostClick = () => {
    setQuestion({ title, body });
    console.log(question);
  };

  return (
    <div className="flex flex-col bg-#F8F9F9 w-3/5">
      <section>
        <form
          className="question-title-container border-2 border-#E3E6E8 w-4/5 mb-12 rounded"
          onSubmit={e => e.preventDefault()}>
          <div className="p-4 bg-#FFFFFF">
            <div className="p-1">Title</div>
            <div className="p-1 text-xs">Be specific and imagine you’re asking a question to another person.</div>
            <input
              className="question-title rounded w-full p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="e.g Is there an R funtion for finding the index of an element in a vector?"></input>
          </div>
        </form>
        <form className="border-2 border-#E3E6E8 w-4/5 mb-12 rounded">
          <div className="p-4 bg-#FFFFFF ">
            <div className="p-1">Body</div>
            <div className="p-1 text-xs">
              The body of your question contains your problem details and results. Minimum 30 characters.
            </div>
            <textarea
              onChange={e => setBody(e.target.value)}
              rows={12}
              className="question-body w-full p-2 bg-#F1F2F3 rounded border-2 border-gray-400 resize-y border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500 "></textarea>
          </div>
        </form>
        <Tag />
        <button
          className="question-post p-2 rounded border-none text-slate-50 bg-sky-500 shadow-blue-500/50 w-36 h-12 text-sm"
          onClick={onPostClick}>
          Post your question
        </button>
      </section>
    </div>
  );
};

export default Ask;
