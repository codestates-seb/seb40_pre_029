import ArticleBottomSet from "./ArticleBottomSet.jsx";
import CommentSet from "./CommentSet.jsx";
import { useState } from "react";
export default function QuestionAnswer({ data, setEditData, setAnswerEdit }) {
  const [answerEditMode] = useState(true);
  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };
  return (
    <>
      {data.answers.data.map((el, idx) =>
        !el.pick ? (
          <div className="flex" key={idx}>
            <CommentSet data={data} />
            <div className="ml-6 mr-8 w-full p-2">
              <p className="text-lg ">{el.article}</p>
              <ArticleBottomSet
                pick="Pick"
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
        ) : (
          <div className="flex border-2 border-emerald-500 rounded-lg" key={idx}>
            <CommentSet data={data} />
            <div className="ml-6 mr-8 w-full p-2">
              <p className="text-lg ">{el.article}</p>
              <ArticleBottomSet
                pick="Pick"
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
        ),
      )}
    </>
  );
}
