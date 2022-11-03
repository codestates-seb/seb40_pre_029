//author 누르면 페이지 이동 title 클릭하면 질문페이지로 이동
//tag 부분 유효성검사 구현
// import AskButton from "../buttons/AskButton.jsx";
import { useState } from "react";
import DefaultButton from "../buttons/DefaultButton.jsx";
import TabDefault from "../tabs/TabDefault.jsx";

export default function QuestionList() {
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
      title: "Z-Index Text Over Image Outlook Email Client",
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
      title: "Google Search Console API data is always off unless I make another API call",
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
      title: "Can`t put new text into the checkedListBox, ArgumentOutOfRangeException [duplicate]",
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
    { name: "Interesting", id: 0 },
    { name: "Bountied", id: 1 },
    { name: "Hot", id: 2 },
    { name: "Week", id: 3 },
    { name: "Month", id: 4 },
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
    <section className="py-8 w-full mr-8">
      <div className="flex justify-between pl-10 mb-4">
        <h1 className="text-3xl mt-1 font-medium">All Questions</h1>
        <DefaultButton name="Ask Question" />
      </div>
      <TabDefault target={filterMap} func={filterOnClick} state={idOn} />
      <ul className="questions-container relative">
        {dummyArticle.map(article => {
          return (
            <div className="flex py-6 border-t border-gray-300" key={article.id}>
              <div className="flex flex-col items-end w-36 flex-none">
                {article.isSelected ? (
                  <div className="border-2 border-sky-700 text-sky-700 pt-0.5 pb-1 px-2 rounded font-semibold mb-1.5">
                    {article.commentsAmount} <span className="font-normal text-sky-800">answers</span>
                  </div>
                ) : (
                  <div className="text-sky-700 pt-0.5 pb-1 rounded font-semibold mb-1.5">
                    {article.commentsAmount} <span className="font-normal text-sky-800">answers</span>
                  </div>
                )}

                <div className="text-gray-500 pt-0.5 pb-1 rounded font-medium mb-1.5">
                  {article.views} <span className="font-normal text-gray-500">views</span>
                </div>
              </div>
              <div className="ml-6 grow">
                <div className="text-2xl text-sky-700 mb-2 break-keep">{article.title}</div>
                <div className="flex justify-between flex-wrap">
                  <BodyTags target={tags} />
                  <div className="inline-block">
                    <span className="text-sky-700 mr-1.5">{article.author_id}</span>
                    <span className="text-gray-500">•&nbsp;&nbsp;{article.date_published}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </section>
  );
}

function BodyTags({ target }) {
  return (
    <div className="flex my-1">
      {target.map((el, idx) => {
        return (
          <span className="flex-none text-sky-800 text-sm px-2 pt-1 pb-1.5 bg-slate-200 rounded-sm mr-1" key={idx}>
            {el.tag}
          </span>
        );
      })}
    </div>
  );
}
