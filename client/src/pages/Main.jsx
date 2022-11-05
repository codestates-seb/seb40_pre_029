import QuestionList from "../components/question/QuestionList.jsx";
import Header from "../components/header/Header.jsx";
import Navigation from "../components/navigation/Navigation.jsx";
import Footer from "../components/footer/Footer.jsx";
import ScrollTop from "../components/buttons/ScrollTop.jsx";
import MyProfile from "./MyProfile.jsx";
// import AskQuestion from "../components/question/AskQuestion.jsx";

const Main = () => {
  return (
    <>
      <Header />
      <div className="flex xl:w-[80rem] max-xl:w-full mx-auto">
        <Navigation className="" />
        <MyProfile className="grow" />
        {/* <AskQuestion /> */}
        {/* <QuestionList className="grow" /> */}
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Main;
