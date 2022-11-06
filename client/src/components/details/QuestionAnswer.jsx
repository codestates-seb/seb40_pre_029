import ArticleBottomSet from "./ArticleBottomSet.jsx";
import UsefulSet from "./UsefulSet.jsx";
import { useState } from "react";
export default function QuestionAnswer({ data }) {
  const answers = data.answers.data;
  const [answerEditMode] = useState(true);
  return (
    <>
      {answers.map((el, idx) => {
        return (
          <div className="flex" key={idx}>
            <UsefulSet />
            <div className="ml-6 mr-8 w-full">
              <p className="text-lg ">{el.article}</p>
              <ArticleBottomSet answerEditMode={answerEditMode} idx={idx} date="2020.10.20" nickname="박해커" />
            </div>
          </div>
        );
      })}
    </>
  );
}
