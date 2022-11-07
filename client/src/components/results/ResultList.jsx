import { useState, useEffect } from "react";
import DefaultButton from "../buttons/DefaultButton.jsx";
// import TabDefault from "../tabs/TabDefault.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import Spinner from "../spinner/Spinner.jsx";
import NotFound from "./NotFound.jsx";

export default function ResultList() {
  const location = useLocation();
  const keyword = location.search.slice(8);
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [fail, setFail] = useState(false);
<<<<<<< Updated upstream
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState([]);
  const [data, setData] = useState({});
  // console.log(keyword);
  // const [idOn, setIdOn] = useState(0);
  // const [filterClicked, setFilterClicked] = useState(false);
  // const [data, setData] = useState({});
  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };

=======
  console.log(totalElements);
>>>>>>> Stashed changes
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`/api/auth/question/search?search=${keyword}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok && !fail === false) {
          console.log(fail);
        } else if (!response.ok && !fail === true) {
          // console.log(fail);
          setFail(!fail);
          // console.log(fail);
        } else if (response.ok) {
          setFail(false);
          const data = await response.json();
          setContent(data.data);
          setTotalElements(data.pageInfo.totalElements);
          setTotalPage(() => makeButton(page, data.pageInfo.totalPages));
          setData(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [keyword]);

  // const makeButton = function (totalPages) {
  //   const pagination = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pagination.push(i);
  //   }
  //   return pagination;
  // };

  const makeButton = function (page, totalPages) {
    console.log("page : " + page);
    console.log("totalpages : " + totalPages);
    const pagination = [1, 2, 3, 4, 5];
    console.log(pagination);
    if (pagination.find(el => el == page)) {
      return pagination.filter(num => num <= totalPages);
    } else {
      while (pagination.find(el => el == page)) {
        pagination.map(el => el + 5);
      }
      return pagination.filter(num => num <= totalPages);
    }
  };

  // const filterMap = [
  //   { name: "Recent", id: 0 },
  //   { name: "Interesting", id: 1 },
  //   { name: "Comments", id: 2 },
  // ];

  const onTitleClick = e => {
    navigate(`/question/${e.target.value}`);
  };
  // const filterOnClick = idx => {
  //   setIdOn(idx);
  //   setFilterClicked(!filterClicked);
  //   if (filterClicked) {
  //     setFilterClicked(true);
  //   }
  // };
  if (content.length === 0) return <Spinner />;
  //   return <div>{key};</div>;
  if (fail) return <NotFound />;
  return (
    <section className="py-8 w-full mr-8">
      <div className="flex justify-between pl-10 mb-4">
        <h1 className="text-3xl mt-1 font-medium">Search Results</h1>
        <DefaultButton name="Ask Question" />
      </div>
      <div className="flex flex-row justify-between items-center pl-10 mb-4">
        <div className="text-2xl flex items-center">
          <div className="mr-1 font-medium inline-block">{totalElements}</div>
          <span className="text-gray-700 font-normal text-xl">Results</span>
        </div>
        {/* <TabDefault target={filterMap} func={filterOnClick} state={idOn} /> */}
      </div>
      <ul className="questions-container relative mb-12">
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
                <div className="flex justify-end flex-wrap">
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
      <div className="pl-10 flex justify-between">
        <button
          onClick={() => setPage(1)}
          className="border border-slate-300 hover:bg-slate-100 text-slate-600 px-3 h-10 mr-1 rounded mb-1">
          처음으로
        </button>
        <div>
          {page - 1 > 0 ? (
            <button
              onClick={() => setPage(() => page - 1)}
              className="hover:bg-emerald-100 text-emerald-600 px-3 h-10 mr-1 rounded mb-1">
              이전
            </button>
          ) : (
            ""
          )}
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
          {page + 1 <= data.pageInfo.totalPages ? (
            <button
              onClick={() => setPage(() => page + 1)}
              className="hover:bg-emerald-100 text-emerald-600 px-3 h-10 mr-1 rounded mb-1">
              다음
            </button>
          ) : (
            ""
          )}
        </div>
        <button
          onClick={() => setPage(data.pageInfo.totalPages)}
          className="border border-slate-300 hover:bg-slate-100 text-slate-600 px-3 h-10 mr-1 rounded mb-1">
          끝으로
        </button>
        {/* <button onClick={() => navigate(`/questions/${totalPages}`)}>{page}</button> */}
      </div>
    </section>
  );
}
