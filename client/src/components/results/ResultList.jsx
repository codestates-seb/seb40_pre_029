import { useState, useEffect } from "react";
import DefaultButton from "../buttons/DefaultButton.jsx";
import TabDefault from "../tabs/TabDefault.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import Spinner from "../spinner/Spinner.jsx";
import NotFound from "./NotFound.jsx";

export default function ResultList() {
  const location = useLocation();
  const keyword = location.search.slice(8);
  // console.log(keyword);
  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };
  const navigate = useNavigate();
  const [idOn, setIdOn] = useState(0);
  const [filterClicked, setFilterClicked] = useState(false);
  const [content, setContent] = useState([]);
  // const [data, setData] = useState({});
  const [totalElements, setTotalElements] = useState(0);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`/auth/question/search?search=${keyword}`, {
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
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [keyword]);

  const filterMap = [
    { name: "Recent", id: 0 },
    { name: "Interesting", id: 1 },
    { name: "Comments", id: 2 },
  ];

  const onTitleClick = e => {
    navigate(`/question/${e.target.value}`);
  };
  const filterOnClick = idx => {
    setIdOn(idx);
    setFilterClicked(!filterClicked);
    if (filterClicked) {
      setFilterClicked(true);
    }
  };
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
    </section>
  );
}
