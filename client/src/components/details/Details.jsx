import TitleBottomInfo from "./TitleBottomInfo.jsx";
import QuestionBody from "./QuestionBody.jsx";
import QuestionAnswer from "./QuestionAnswer.jsx";
import UsefulSet from "./UsefulSet.jsx";
import DefaultButton from "../buttons/DefaultButton.jsx";
import { useState } from "react";

export default function Details() {
  const [body, setBody] = useState("");
  return (
    <div className="mx-auto bg-gray-50 max-w-5xl pl-8">
      <div className="py-8 border-b border-gray-300">
        <h3 className="text-3xl mb-4">value attribute in hbs not showing string after space</h3>
        <div>
          <TitleBottomInfo element="Asked" value="today" />
          <TitleBottomInfo element="Modified" value="today" />
          <TitleBottomInfo element="Viewed" value="3 times" />
        </div>
      </div>
      <div className="py-8 flex flex-row">
        <UsefulSet />
        <QuestionBody />
      </div>
      <div className="mt-4">
        <span className="text-2xl mr-4">1</span>
        <span className="text-2xl">Answer</span>
      </div>
      <div className="py-8 flex flex-row py-8 border-b border-gray-300">
        <UsefulSet />
        <QuestionAnswer />
      </div>
      <div className="py-8 pr-8">
        <span className="text-2xl">Your Answer</span>
        <form className="w-full mt-4 rounded">
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={12}
            className="w-full p-2 bg-#F1F2F3 rounded border border-gray-300 focus:text-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:border focus:ring-emerald-100 text-gray-500"></textarea>
        </form>
        <DefaultButton name="Post Your Answer" />
      </div>
    </div>
  );
}
