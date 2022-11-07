//질문하기 버튼을 누르면 보이는 창이다.
// /ask [POST] => { title , body , tags }
// /edit [PATCH]
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tag from "./Tag.jsx";

const AskQuestion = ({ onEditMode, editData }) => {
  const navigate = useNavigate();

  const params = useParams();
  const [question, setQuestion] = useState({ title: "", article: "", tagList: [] });
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [tagList, setTagList] = useState([]);
  //처음 fetch data 상태화

  useEffect(() => {
    if (onEditMode) {
      setTitle(editData.title);
      setArticle(editData.article);
    }
  }, [editData]);

  const onPostClick = () => {
    setQuestion({ title, article, tagList });
    postData(question);
    if (!onEditMode) {
      navigate("/");
      window.location.reload();
    } else {
      console.log(editData);
      navigate(`/questions/${editData.questionId}`);
    }
  };

  const handleOnChange = e => {
    setArticle(e.target.value);
    setQuestion({ title, article: e.target.value });
  };

  const postData = async question => {
    //만약 edit 버튼을 통해 컴포넌트에 접근을 하지 않았다면 (ask question 버튼을 눌렀다면)
    if (!onEditMode) {
      await fetch("/auth/question/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question),
      }).then(res => console.log(res));
    } else {
      //만약 edit 버튼을 통해 컴포넌트에 접근했다면
      await fetch(`/auth/question/patch/${params.id}`, {
        withCredentials: true,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question),
      });
    }
  };

  return (
    <div className="flex xl:w-[80rem] max-xl:w-full mx-auto py-8 justify-center xl:h-[60rem]">

      <section>
        <form
          className="question-title-container w-full mb-4 rounded bg-white shadow-md dark:bg-slate-800 dark:text-gray-400"
          onSubmit={e => e.preventDefault()}>
          <div className="py-6 px-8 bg-#FFFFFF">
            <div className="text-xl font-medium ">Title</div>
            <div className="text-sm text-gray-500 mb-4 mt-2">
              Be specific and imagine you’re asking a question to another person.
            </div>
            <input
              className="question-title text-sm rounded w-full p-2 border border-gray-400 border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"
              onChange={e => setTitle(e.target.value)}
              value={title}
              required
              placeholder="e.g Is there an R funtion for finding the index of an element in a vector?"></input>
          </div>
        </form>
        <form className="w-full mb-4 rounded bg-white shadow-md dark:bg-slate-800 dark:text-gray-400">
          <div className="py-6 px-8 bg-#FFFFFF ">
            <div className="text-xl font-medium ">Body</div>
            <div className="text-sm text-gray-500 mb-4 mt-2">
              The body of your question contains your problem details and results. Minimum 30 characters.
            </div>
            <textarea
              onChange={handleOnChange}
              value={article}
              rows={12}
              className="question-body w-full p-2 bg-#F1F2F3 rounded border border-gray-400 resize-y border rounded border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500 "></textarea>
          </div>
        </form>
        <Tag setTagList={setTagList} tagList={tagList} />
        <button
          className="question-post p-2 mb-4 rounded border-none text-slate-50 bg-sky-500 shadow-blue-500/50 shadow w-36 h-12 text-sm"
          onClick={onPostClick}>
          {onEditMode ? "Edit your question" : "Post your question"}
        </button>
      </section>
    </div>
  );
};

export default AskQuestion;
