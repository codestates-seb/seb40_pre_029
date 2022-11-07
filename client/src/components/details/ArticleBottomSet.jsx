import ProfileCard from "./ProfileCard.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function ArticleBottomSet({ answerEditMode, date, nickname, data, idx, setEditData, setAnswerEdit }) {
  const params = useParams();
  const navigate = useNavigate();
  const onEditClick = () => {
    if (!answerEditMode) {
      navigate(`/question/edit/${params.id}`);
    } else if (answerEditMode) {
      let editRequired = data.answers.data[idx];
      setEditData(editRequired);
      setAnswerEdit(true);
    }
  };

  return (
    <>
      <div className="my-4 flex justify-between">
        <div>
          <span className="text-slate-500 mr-2">Share</span>
          <button onClick={onEditClick} value={idx} className="text-slate-500 mr-2">
            Edit
          </button>
          <button className="text-slate-500 mr-2">Delete</button>
        </div>
        <ProfileCard date={date} nickname={nickname} />
      </div>
      <span className="text-gray-400">Add a comment</span>
    </>
  );
}
