import { useState, useEffect } from "react";
import DefaultButton from "../buttons/DefaultButton.jsx";
import TabDefault from "../tabs/TabDefault.jsx";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Spinner from "../spinner/Spinner.jsx";
import { useSelector } from "react-redux";

export default function QuestionList() {
  //handling filter click tab event
  const isLogin = useSelector(state => state.isLogin);

  const filterMap = [
    { name: "Recent", id: 0 },
    { name: "Interesting", id: 1 },
    { name: "Comments", id: 2 },
  ];
  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };
  const navigate = useNavigate();
  const [filterClicked, setFilterClicked] = useState(false);
  const [idOn, setIdOn] = useState(0);
  const [content, setContent] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  async function getData() {
    if (idOn === 0) {
      await fetch(`/auth/question?page=${page}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(res => res.json())
        .then(data => {
          setTotalPage(() => makeButton(data.pageInfo.totalPages));
          setContent(data.data);
          setData(data);
        });
    }
    if (idOn === 1) {
      await fetch(`/auth/question?sort=views&page=${page}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(res => res.json())
        .then(data => {
          setTotalPage(() => makeButton(data.pageInfo.totalPages));
          setContent(data.data);
          setData(data);
        });
    }
    if (idOn === 2) {
      await fetch(`/auth/question?sort=answern&page=${page}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(res => res.json())
        .then(data => {
          setTotalPage(() => makeButton(data.pageInfo.totalPages));
          setContent(data.data.filter(el => el.answern !== 0));
          setData(data);
        });
    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    getData();
  }, [idOn]);

  useEffect(() => {
    getData();
  }, [idOn]);

  const makeButton = function (totalPages) {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(i);
    }
    return pagination;
  };

  //if this is on, have to [GET] for its relating data
  const onTitleClick = e => {
    navigate(`/questions/${e.target.value}`);
  };

  const filterOnClick = idx => {
    setIdOn(idx);
    setFilterClicked(!filterClicked);
    if (filterClicked) {
      setFilterClicked(true);
    }
  };

  if (content.length === 0) return <Spinner />;
  return (
    <section className="py-8 w-full mr-8 xl:h-[60rem]">
      <div className="flex justify-between pl-10 mb-4">
        <h1 className="text-3xl mt-1 font-medium">All Questions</h1>
        {isLogin ? <DefaultButton name="Ask Question" /> : null}
      </div>
      <div className="flex flex-row justify-between items-center pl-10 mb-4">
        <div className="text-2xl flex items-center">
          <div className="mr-1 font-medium inline-block">{data.pageInfo.totalElements}</div>
          <span className="text-gray-700 font-normal text-xl">questions</span>
        </div>
        <TabDefault target={filterMap} func={filterOnClick} state={idOn} />
      </div>
      <ul className="questions-container relative">
        {content.map((article, idx) => {
          return (
            <div className="flex py-6 border-t border-gray-300" key={idx}>
              <div className="flex flex-col items-end w-32 flex-none mt-0.5">
                {article.answern ? (
                  <div className="text-sky-700 pt-0.5 pb-1 rounded font-semibold mb-1.5">
                    {article.answern} <span className="font-normal text-sky-800">answers</span>
                  </div>
                ) : (
                  <div className="text-sky-700 pt-0.5 pb-1 rounded font-semibold mb-1.5">
                    0 <span className="font-normal text-sky-800">answers</span>
                  </div>
                )}

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
                  className="text-left text-2xl text-sky-700 mb-2 break-keep">
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
      {/* <Pagination /> */}
      <div className="pl-10 mb-4 flex justify-between">
        <button
          onClick={() => setPage(1)}
          className="border border-emerald-500 hover:bg-emerald-100 text-emerald-600 px-3 h-10 mr-1 rounded mb-1">
          처음으로
        </button>
        <div>
          {totalPage.map((button, idx) => {
            return (
              <button
                onClick={() => setPage(button)}
                key={idx}
                className={
                  page === button
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white w-10 h-10 mr-1 rounded mb-1"
                    : "hover:bg-emerald-100 text-emerald-600 w-10 h-10 mr-1 rounded mb-1"
                }>
                {button}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setPage(totalPage.length)}
          className="border border-emerald-500 hover:bg-emerald-100 text-emerald-600 px-3 h-10 mr-1 rounded mb-1">
          끝으로
        </button>
        {/* <button onClick={() => navigate(`/questions/${totalPages}`)}>{page}</button> */}
      </div>
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
