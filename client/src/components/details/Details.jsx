import TitleBottomInfo from "./TitleBottomInfo.jsx";
import QuestionBody from "./QuestionBody.jsx";
import QuestionAnswer from "./QuestionAnswer.jsx";
import UsefulSet from "./UsefulSet.jsx";
import DefaultButton from "../buttons/DefaultButton.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const params = useParams();
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/auth/question/${params.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        setData(data.data);
      });
    return () => {
      return;
    };
  }, []);

  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };

  return (
    <div className="w-full pt-10 pb-4 mr-8">
      <div className="pl-12 pb-6 border-b border-gray-300">
        <h3 className="text-3xl mb-4 font-medium">{data.title}</h3>
        <div>
          <TitleBottomInfo element="Asked" value={getParsedDate(data.createAt)} />
          <TitleBottomInfo
            element="Modified"
            value={
              getParsedDate(data.createAt) === getParsedDate(data.modifiedAt) ? "Today" : getParsedDate(data.modifiedAt)
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
        <span className="text-2xl mr-4">1</span>
        <span className="text-2xl">Answer</span>
      </div>
      <div className="py-8 pl-12 flex flex-row border-b border-gray-300">
        <UsefulSet />
        <QuestionAnswer data={data} />
      </div>
      <div className="py-8 pr-8 pl-12">
        <span className="text-2xl">Your Answer</span>
        <form className="w-full mt-4 rounded mb-10">
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={12}
            className="w-full p-2 bg-#F1F2F3 rounded border border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></textarea>
        </form>
        <DefaultButton name="Post Your Answer" />
      </div>
    </div>
  );
}
