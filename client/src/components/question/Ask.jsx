//질문하기 버튼을 누르면 보이는 창이다.
// /ask [POST] => { title , body , tags }
import { useState } from "react";
import Tag from "./Tag.jsx";

const Ask = () => {
  const [question, setQuestion] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // const [textarea, setTextArea] = useState({
  //   value: "",
  //   rows: 10,
  //   minRows: 5,
  //   maxRows: 15,
  // });

  const onPostClick = () => {
    setQuestion({ title, body });
    console.log(question);
  };

  // const textOnChange = (e) => {
  //   setBody(e.target.value);
  //   const textareaLineHeight = 12;
  //   const { minRows, maxRows } = textarea;
  //   console.log(e.target.scrollHeight);
  //   const previousRows = e.target.rows;
  //   e.target.rows = minRows;

  //   const currentRows = e.target.scrollHeight / textareaLineHeight;

  //   if (currentRows === previousRows) {
  //     e.target.rows = currentRows;
  //   }

  //   if (currentRows >= maxRows) {
  //     e.target.rows = maxRows;
  //     e.target.scrollTop = e.target.scrollHeight;
  //   }

  //   setTextArea({
  //     value: e.target.value,
  //     rows: currentRows < maxRows ? currentRows : maxRows,
  //   });
  // };

  return (
    <div className="flex flex-col bg-#F8F9F9 w-3/5">
      <section>
        <form
          className="question-title-container border-2 border-#E3E6E8 w-4/5 mb-12 rounded"
          onSubmit={e => e.preventDefault()}>
          <div className="p-4 bg-#FFFFFF">
            <div className="p-1">제목</div>
            <input
              className="question-title rounded w-full p-2 placeholder:italic border-2 border-gray-400"
              onChange={e => setTitle(e.target.value)}
              placeholder="title"></input>
          </div>
        </form>
        <form className="border-2 border-#E3E6E8 w-4/5 mb-12 rounded">
          <div className="p-4 bg-#FFFFFF ">
            <div className="p-1">본문</div>
            <textarea
              onChange={e => setBody(e.target.value)}
              rows={12}
              className="question-body w-full p-2 bg-#F1F2F3 rounded border-2 border-gray-400 placeholder:italic resize-y "
              placeholder="text area"></textarea>
          </div>
        </form>
        <Tag />
        <button
          className="question-post p-2 rounded border-none text-slate-50 bg-sky-400 w-40 h-12 text-sm"
          onClick={onPostClick}>
          Post your question
        </button>
      </section>
    </div>
  );
};

export default Ask;
