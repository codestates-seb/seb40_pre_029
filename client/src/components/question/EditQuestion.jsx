import AskQuestion from "./AskQuestion.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditQuestion = () => {
  const params = useParams();
  const [editData, setEditData] = useState({ title: "", article: "", tagName: "", questionId: "" }); // 여기에 questionId 바꿔야함
  const onEditMode = true;

  useEffect(() => {
    async function getData() {
      fetch(`/api/auth/question/${params.id}`) // params 지우고 questionId 넣어야함
        .then(res => res.json())
        .then(data => {
          setEditData(data.data);
        });
    }
    getData();
  }, []);

  return <AskQuestion onEditMode={onEditMode} editData={editData} />;
};

export default EditQuestion;
