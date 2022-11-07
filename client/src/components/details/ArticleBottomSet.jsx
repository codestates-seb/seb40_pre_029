import ProfileCard from "./ProfileCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ArticleBottomSet({ answerEditMode, date, nickname, data, idx, setEditData, setAnswerEdit }) {
  const params = useParams();
  const token = useSelector(state => state.authorization);

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

  const deleteArticle = async () => {
    const deletedone = await fetch(`/api/auth/question/patch/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({
        questionStatus: "false",
      }),
    });

    let del = deletedone;
    if (!del.ok) {
      return alert("에러가 발생하였습니다");
    } else {
      del.json().then(navigate("/"));
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
          <button className="text-slate-500 mr-2" onClick={deleteArticle}>
            Delete
          </button>
        </div>
        <ProfileCard date={date} nickname={nickname} />
      </div>
      <span className="text-gray-400">Add a comment</span>
    </>
  );
}
