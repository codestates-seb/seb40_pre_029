import ProfileCard from "./ProfileCard.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function ArticleBottomSet({ answerEditMode, idx, date, nickname }) {
  const params = useParams();
  const navigate = useNavigate();
  console.log(answerEditMode, idx);

  const onEditClick = () => {
    if (!answerEditMode) {
      navigate(`/question/edit/${params.id}`);
    } else if (answerEditMode) {
      console.log("아직 구현중~");
    }
  };
  return (
    <>
      <div className="my-4 flex justify-between">
        <div>
          <span className="text-slate-500 mr-2">Share</span>
          <button onClick={onEditClick} className="text-slate-500 mr-2">
            Edit
          </button>
          <span className="text-slate-500 mr-2">Follow</span>
        </div>
        <ProfileCard date={date} nickname={nickname} />
      </div>
      <span className="text-gray-400">Add a comment</span>
    </>
  );
}
