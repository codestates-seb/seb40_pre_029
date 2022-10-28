//질문하기 버튼을 누르면 보이는 창이다.
// /ask [POST] => { title , body , tags }
import { useState } from "react";

const Question = () => {
  const [question, setQuestion] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tagAmount, setTagAmout] = useState(0);
  // const [textarea, setTextArea] = useState({
  //   value: "",
  //   rows: 10,
  //   minRows: 5,
  //   maxRows: 15,
  // });

  const onPostClick = () => {
    setQuestion({ title, body, tagList });
    console.log(question);
  };

  const onKeyPress = (e) => {
    if (
      e.target.value !== "" &&
      e.key === "Enter" &&
      tagList.indexOf(e.target.value) === -1
    ) {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    if (tagAmount < 5) {
      let updatedTagList = [...tagList];
      updatedTagList.push(tagItem);
      setTagList(updatedTagList);
      setTagItem("");
      setTagAmout(tagAmount + 1);
    } else {
      window.alert("hi");
    }
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
    setTagAmout(tagAmount - 1);
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
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="p-4 bg-#FFFFFF">
            <div className="p-1">제목</div>
            <input
              className="question-title rounded w-full p-2 placeholder:italic border-2 border-gray-400"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
            ></input>
          </div>
        </form>
        <form className="border-2 border-#E3E6E8 w-4/5 mb-12 rounded">
          <div className="p-4 bg-#FFFFFF ">
            <div className="p-1">본문</div>
            <textarea
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              className="question-body w-full p-2 bg-#F1F2F3 rounded border-2 border-gray-400 placeholder:italic resize-y "
              placeholder="text area"
            ></textarea>
          </div>
        </form>
        <div className="question-tag-container border-2 border-#E3E6E8 w-4/5 mb-12 rounded">
          <div className="question-tag p-4 bg-#FFFFFF">
            <div className="p-1">태그</div>
            <div className="flex border-2 focus-within:border-pink-300 rounded">
              <div className="flex">
                {tagList.map((tagItem, index) => {
                  return (
                    <div
                      className="p-1 tag-item inline-flex justify-center items-center rounded m-2 bg-sky-200"
                      key={index}
                    >
                      <div className="ml-3 mr-1 bg-red">{tagItem}</div>
                      <button className="ml-1 mr-3" onClick={deleteTagItem}>
                        ❌
                      </button>
                    </div>
                  );
                })}
              </div>
              <input
                className="flex-wrap w-full p-2 placeholder:italic bg-transparent outline-none"
                type="text"
                onChange={(e) => setTagItem(e.target.value)}
                value={tagItem}
                onKeyPress={onKeyPress}
              ></input>
            </div>
          </div>
        </div>
        <button
          className="question-post p-2 rounded border-none text-slate-50 bg-sky-400 w-40 h-12 text-sm"
          onClick={onPostClick}
        >
          Post your question
        </button>
      </section>
    </div>
  );
};

export default Question;
