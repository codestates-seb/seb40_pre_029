import ProfileCard from "./ProfileCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ArticleBottomSet({
  pick,
  answerEditMode,
  date,
  nickname,
  data,
  idx,
  setEditData,
  setAnswerEdit,
  setPick,
}) {
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
  const pickOnclick = async e => {
    const pickData = data.answers.data[e.target.value];
    const pickAnswer = await fetch(`/api/auth/answer/pick`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({
        answerId: pickData.answerId,
      }),
    });
    let res = pickAnswer;
    if (!res.ok && res.status === 400) {
      window.alert("Only author can pick answer!");
    } else if (!res.ok && res.status === 409) {
      window.alert("You already picked an answer");
    }
    setPick(pickData.pick);
  };

  return (
    <>
      <div className="my-4 flex justify-between">
        <div>
          <button onClick={pickOnclick} value={idx} className="text-slate-500 mr-2">
            {pick}
          </button>
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
