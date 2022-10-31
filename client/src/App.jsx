import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Ask from "./pages/Ask.jsx";
// import Footer from "./components/footer/Footer.jsx";
// import Ask from "./components/question/Ask.jsx";
// import Header from "./components/header/Header.jsx";
// import Details from "./components/details/Details.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/ask" element={<Ask />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
