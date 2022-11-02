//author 누르면 페이지 이동 title 클릭하면 질문페이지로 이동
//tag 부분 유효성검사 구현
// import AskButton from "../buttons/AskButton.jsx";
import { useState } from "react";
import DefaultButton from "../buttons/DefaultButton.jsx";
import { useNavigate } from "react-router-dom";
import dummyArticle from "../../dummydata.js";
import { useDispatch, useSelector } from "react-redux";
// import { viewsUp } from "../../redux/store.jsx";

const QuestionList = () => {
  const dispatch = useDispatch();
  const views = useSelector(state => {
    console.log(state[0]);
    return state[0].views;
  });

  views;

  const [filterClicked, setFilterClicked] = useState(false);
  const [idOn, setIdOn] = useState(0);
  const navigate = useNavigate();

  const tags = dummyArticle[0].tags;

  //handling filter click tab event
  const filterMap = [
    { name: "Interesting", id: 0 },
    { name: "Week", id: 1 },
    { name: "Month", id: 2 },
  ];
  //if this is on, have to [GET] for its relating data
  const filterOnClick = idx => {
    setIdOn(idx);
    setFilterClicked(!filterClicked);
    if (filterClicked) {
      setFilterClicked(true);
    }
    // if (Number(e.target.value) === filterMap.length - 1) {
    //   setIsLast(true);
    //   console.log(isLast);
    // }
  };

  //question을 누르면 해당 id의 질문 디테일 페이지로 넘어감
  //dummyArticle[0] << 이거 수정해야함
  const titleOnClick = () => {
    dispatch({ type: "viewCount/viewsUp", step: 1 });
    navigate(`/questions/${dummyArticle[0].QUESTION_ID}`);
    console.log("hi");
  };

  return (
    <section className="py-8 pl-12 w-full ">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl mt-1 font-medium">All Questions</h1>
        <DefaultButton name="Ask Question" />
      </div>
      <div className="flex justify-end mb-4">
        <div className="rounded text-gray-500 text-sm font-medium">
          {filterMap.map((el, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  filterOnClick(idx);
                }}
                value={el.id}
                className={
                  filterClicked && idOn === el.id
                    ? "p-2 px-4 inline-block border border-gray-400 text-zinc-500 bg-slate-200 h-10 -mr-1 pt-1.5 first:rounded-l last:rounded-r"
                    : "p-2 px-4 inline-block border border-gray-400 text-gray-500 bg-white hover:bg-slate-100 h-10 -mr-1 pt-1.5 first:rounded-l last:rounded-r"
                }>
                {el.name}
              </button>
            );
          })}
        </div>
      </div>
      <ul className="questions-container relative">
        {dummyArticle.map(article => {
          return (
            <div className="question-summary p-4 border-t-2 flex grow " key={article.QUESTION_ID}>
              <div className="question-stats flex flex-col flex-wrap shrink-0 justify-center items-end mr-4 p-1 mb-1">
                {article.isSelected ? (
                  <div className="question-answer text-sm border-2 border-green-600 text-green-800 p-1 rounded">
                    {article.commentsAmount} answers
                  </div>
                ) : (
                  <div className="question-answer text-sm">{article.commentsAmount} answers</div>
                )}

                <div className="question-views text-sm">{article.views} views</div>
              </div>
              <li className="question">
                <div className="question-content grow-1 max-w-full flex-col">
                  <button onClick={titleOnClick} className="question-title break-words mb-1 p-1">
                    {article.title}
                  </button>
                  <div className="question-summary-meta flex flex-wrap justify-end space-x-16 gap-x-1 gap-y-2">
                    <div className="question-tag inline-flex">
                      {tags.map((el, idx) => {
                        return (
                          <div className="border-2 mr-1 mb-1 p-1 text-xs" key={idx}>
                            {el.tag}
                          </div>
                        );
                      })}
                    </div>
                    <div className="author-info flex items-center ml-auto gap-1 ">
                      <div className="question-author text-sm">{article.author_id}</div>
                      <div className="question-createdAt text-sm">{article.date_published}</div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default QuestionList;
