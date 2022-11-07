import ArticleBottomSet from "./ArticleBottomSet.jsx";
import UsefulSet from "./UsefulSet.jsx";
import { useState } from "react";
export default function QuestionAnswer({ data, setEditData, setAnswerEdit }) {
  const [answerEditMode] = useState(true);
  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };

  return (
    <>
      {data.answers.data.map((el, idx) => {
        return (
          <div className="flex" key={idx}>
            <UsefulSet />
            <div className="ml-6 mr-8 w-full">
              <p className="text-lg ">{el.article}</p>
              <ArticleBottomSet
                setAnswerEdit={setAnswerEdit}
                setEditData={setEditData}
                answerEditMode={answerEditMode}
                idx={idx}
                date={getParsedDate(el.createAt)}
                nickname={el.answerAuthor}
                data={data}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
