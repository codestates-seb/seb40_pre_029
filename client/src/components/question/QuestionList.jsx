//author 누르면 페이지 이동 title 클릭하면 질문페이지로 이동
//tag 부분 유효성검사 구현
// import AskButton from "../buttons/AskButton.jsx";
import { useState, useEffect } from "react";
import DefaultButton from "../buttons/DefaultButton.jsx";
import TabDefault from "../tabs/TabDefault.jsx";
import { useNavigate } from "react-router-dom";

export default function QuestionList() {
  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };

  const navigate = useNavigate();
  const [filterClicked, setFilterClicked] = useState(false);
  const [idOn, setIdOn] = useState(0);
  const [content, setContent] = useState([]);
  // const hi = async data => {
  //   console.log(data);
  //   await fetch(`/question`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "skip" },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setContent(data);
  //     });
  // };
  // hi();
  console.log(content);
  useEffect(() => {
    async function getData() {
      await fetch("/question", {
        method: "GET",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "skip" },
      })
        .then(res => res.json())
        .then(data => {
          setContent(data.content);
        });
    }
    getData();
  }, []);

  //handling filter click tab event
  const filterMap = [
    { name: "Interesting", id: 0 },
    { name: "Week", id: 1 },
    { name: "Month", id: 2 },
  ];
  //if this is on, have to [GET] for its relating data
  const onTitleClick = e => {
    console.log(e.target.value);
    navigate(`/questions/${e.target.value}`);
  };
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

  return (
    <section className="py-8 w-full mr-8">
      <div className="flex justify-between pl-10 mb-4">
        <h1 className="text-3xl mt-1 font-medium">All Questions</h1>
        <DefaultButton name="Ask Question" />
      </div>
      <TabDefault target={filterMap} func={filterOnClick} state={idOn} />
      <ul className="questions-container relative">
        {content.map((article, idx) => {
          console.log(article);
          return (
            <div className="flex py-6 border-t border-gray-300" key={idx}>
              <div className="flex flex-col items-end w-36 flex-none">
                {/* {article.isSelected ? (
                  <div className="border-2 border-sky-700 text-sky-700 pt-0.5 pb-1 px-2 rounded font-semibold mb-1.5">
                    {article.commentsAmount} <span className="font-normal text-sky-800">answers</span>
                  </div>
                ) : (
                  <div className="text-sky-700 pt-0.5 pb-1 rounded font-semibold mb-1.5">
                    {article.commentsAmount} <span className="font-normal text-sky-800">answers</span>
                  </div>
                )} */}

                <div className="text-gray-500 pt-0.5 pb-1 rounded font-medium mb-1.5">
                  {article.views} <span className="font-normal text-gray-500">views</span>
                </div>
              </div>
              <div className="ml-6 grow">
                <button
                  value={article.questionId}
                  onClick={onTitleClick}
                  className="text-2xl text-sky-700 mb-2 break-keep">
                  {article.title}
                </button>
                <div className="flex justify-between flex-wrap">
                  {/* <BodyTags target={article.tags} /> */}
                  <div className="inline-block">
                    {/* <span className="text-sky-700 mr-1.5">{article.MEMBER_ID}</span> */}
                    <span className="text-gray-500">•&nbsp;&nbsp;{getParsedDate(article.createAt)}</span>
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

// function BodyTags({ target }) {
//   return (
//     <div className="flex my-1">
//       {target.map((el, idx) => {
//         return (
//           <span className="flex-none text-sky-800 text-sm px-2 pt-1 pb-1.5 bg-slate-200 rounded-sm mr-1" key={idx}>
//             {el.tag}
//           </span>
//         );
//       })}
//     </div>
//   );
// }
