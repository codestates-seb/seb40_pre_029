//author 누르면 페이지 이동 title 클릭하면 질문페이지로 이동
//tag 부분 유효성검사 구현
import AskButton from "../buttons/AskButton.jsx";
import { useState } from "react";

const QuestionList = () => {
  const [filterClicked, setFilterClicked] = useState(false);
  // const [isLast, setIsLast] = useState(false);
  const [idOn, setIdOn] = useState(0);
  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };

  //dummy article
  const dummyArticle = [
    {
      author_id: "신동엽",
      title: "국민MC가 되기 위해선 무얼 해야하나요?",
      tags: [
        { tag: "엔터테인먼트", tagId: 23 },
        { tag: "자바스크립트", tagId: 17 },
        { tag: "방송", tagId: 14 },
        { tag: "프로젝트", tagId: 13 },
        { tag: "화이팅", tagId: 12 },
      ],
      views: 12,
      commentsAmount: 7,
      date_published: getParsedDate("2022-02-24T16:17:47.000Z"),
      id: 0,
      recommendId: ["유재석"],
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      upVote: 3,
      downVote: 0,
      isSelected: true,
    },
    {
      author_id: "유재석",
      title: "국민MC가 되기 위해선 무얼 해야하나요?",
      tags: [
        { tag: "엔터테인먼트", tagId: 23 },
        { tag: "자바스크립트", tagId: 17 },
        { tag: "방송", tagId: 14 },
        { tag: "방송", tagId: 13 },
        { tag: "방송", tagId: 12 },
      ],
      views: 40,
      commentsAmount: 10,
      date_published: getParsedDate("2022-02-24T16:17:47.000Z"),
      id: 2,
      recommendId: ["강호동", "신동엽"],
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      upVote: 7,
      downVote: 3,
      isSelected: false,
    },
    {
      author_id: "강호동",
      title: "씨름선수가 되기 위해선 무얼 해야하나요?",
      tags: [
        { tag: "엔터테인먼트", tagId: 23 },
        { tag: "자바스크립트", tagId: 17 },
        { tag: "백엔드도", tagId: 14 },
        { tag: "프로젝트", tagId: 13 },
        { tag: "화이팅", tagId: 12 },
      ],
      views: 65,
      commentsAmount: 3,
      date_published: getParsedDate("2022-02-24T16:17:47.000Z"),
      id: 1,
      recommendId: ["유재석", "신동엽"],
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      upVote: 17,
      downVote: 1,
      isSelected: true,
    },
  ];

  const tags = dummyArticle[0].tags;

  //handling filter click tab event
  const filterMap = [
    { name: "Recent", id: 0 },
    { name: "Hot", id: 1 },
  ];
  //if this is on, have to [GET] for its relating data
  const filterOnClick = idx => {
    setIdOn(idx);
    console.log(idx);
    console.log(idOn);
    console.log(filterClicked);
    setFilterClicked(!filterClicked);
    if (filterClicked) {
      setFilterClicked(true);
    }
    // if (Number(e.target.value) === filterMap.length - 1) {
    //   setIsLast(true);
    //   console.log(isLast);
    // }
  };

  return (
    <section className="mb-4 p-4 lg:w-2/5 w-full ">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl">Recent Questions</h1>
        <div>
          <AskButton />
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <div className="rounded border-gray-400 border text-gray-500">
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
                    ? // ? isLast
                      //   ? "p-2 px-4 inline-block border-gray-400 border-r text-zinc-500 bg-slate-200 -mr-1"
                      "p-2 px-4 inline-block border-gray-400 border-r text-zinc-500 bg-slate-200"
                    : "p-2 px-4 inline-block border-gray-400 border-r text-gray-500 hover:bg-slate-100"
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
            <div className="question-summary p-4 border-t-2 flex grow " key={article.id}>
              <div className="question-stats flex flex-col flex-wrap shrink-0 items-end mr-4 p-1 mb-1">
                <div className="question-upvote">{article.upVote} votes</div>
                {article.isSelected ? (
                  <div className="question-answer border-2 border-green-600 text-green-800 p-1 rounded">
                    {article.commentsAmount} answers
                  </div>
                ) : (
                  <div className="question-answer">{article.commentsAmount} answers</div>
                )}

                <div className="question-views">{article.views} views</div>
              </div>
              <li className="question">
                <div className="question-content grow-1 max-w-full flex-col">
                  <div className="question-title break-words mb-1 p-1">{article.title}</div>
                  <div className="question-summary-meta flex flex-wrap items-center space-x-16 gap-x-1 gap-y-2">
                    <div className="question-tag inline-flex">
                      {tags.map((el, idx) => {
                        return (
                          <div className="border-2 mr-1 mb-1 p-1" key={idx}>
                            {el.tag}
                          </div>
                        );
                      })}
                    </div>
                    <div className="author-info flex items-center ml-auto justify-end gap-1 ">
                      <div className="question-author">{article.author_id}</div>
                      <div className="question-createdAt">{article.date_published}</div>
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
