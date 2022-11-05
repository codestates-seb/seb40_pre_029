import ProfileCard from "./ProfileCard.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function ArticleBottomSet({ date, nickname }) {
  const params = useParams();
  const navigate = useNavigate();
  const onEditClick = e => {
    navigate(`/question/edit/${params.id}`);
    console.log(e);
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
