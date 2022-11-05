import AskQuestion from "./AskQuestion.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditQuestion = () => {
  const params = useParams();
  const [editData, setEditData] = useState({ title: "", article: "" });
  const onEditMode = true;

  useEffect(() => {
    async function getData() {
      fetch(`/auth/question/${params.id}`)
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
