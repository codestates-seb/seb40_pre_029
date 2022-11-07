import TitleBottomInfo from "./TitleBottomInfo.jsx";
import QuestionBody from "./QuestionBody.jsx";
import QuestionAnswer from "./QuestionAnswer.jsx";
import UsefulSet from "./UsefulSet.jsx";
import DefaultButton from "../buttons/DefaultButton.jsx";
import Spinner from "../spinner/Spinner.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Details() {
  const isLogin = useSelector(state => state.isLogin);
  const params = useParams();
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  //질문 detail fetching
  useEffect(() => {
    setTimeout(() => {
      fetch(`/api/auth/question/${params.id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setData(data.data);
        });
    }, 500);
    return () => {
      return;
    };
  }, []);
  //createAt 조정
  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };

  if (data.length === 0) return <Spinner />;
  return (
    <div className="w-full pt-10 pb-4 mr-8">
      <div className="pl-12 pb-6 border-b border-gray-300">
        <h3 className="text-3xl mb-4 font-medium">{data.title}</h3>
        <div>
          <TitleBottomInfo element="Asked" value={getParsedDate(data.createAt)} />
          <TitleBottomInfo
            element="Modified"
            value={
              getParsedDate(data.createAt) === getParsedDate(data.modifiedAt)
                ? getParsedDate(data.createAt)
                : getParsedDate(data.modifiedAt)
            }
          />
          <TitleBottomInfo element="Viewed" value={data.views} />
        </div>
      </div>
      <div className="py-8 pl-12 flex flex-row">
        <UsefulSet />
        <QuestionBody data={data} />
      </div>
      <div className="mt-4 pl-12 ">
        <span className="text-2xl mr-4">{data.answers.data.length}</span>
        <span className="text-2xl">{data.answers.data.length <= 1 ? "Answer" : "Answers"}</span>
      </div>
      <div className="py-8 pl-12 flex flex-col border-b border-gray-300">
        <QuestionAnswer data={data} />
      </div>
      {isLogin ? (
        <div className="py-8 pr-8 pl-12">
          <span className="text-2xl">Your Answer</span>
          <form className="w-full mt-4 rounded mb-10">
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={12}
              className="w-full p-2 bg-#F1F2F3 rounded border border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500 dark:bg-gray-400"></textarea>
          </form>
          <DefaultButton name="Post Your Answer" data={comment} />
        </div>
      ) : null}
    </div>
  );
}
