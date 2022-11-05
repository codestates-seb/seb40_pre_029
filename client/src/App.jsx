import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Ask from "./pages/Ask.jsx";
import Question from "./pages/Question.jsx";
import Edit from "./pages/Edit.jsx";

//axios로 백엔드 db에서 questions를 GET함 => 해당 res.data.id 가 /question/${res.data.id}가 되고 props로 question 컴포넌트에 해당 db를 넘기면, 컴포넌트에서 데이터 가공 후 화면에 띄움

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/myprofile" element={<MyProfile />}></Route>
          <Route exact path="/ask" element={<Ask />}></Route>
          <Route exact path={`/questions/:id`} element={<Question />}></Route>
          <Route exact path={`/question/edit/:id`} element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
