import QuestionList from "../components/question/QuestionList.jsx";
import Header from "../components/header/Header.jsx";
import Navigation from "../components/navigation/Navigation.jsx";
import Footer from "../components/footer/Footer.jsx";
import ScrollTop from "../components/buttons/ScrollTop.jsx";

const Main = () => {
  return (
    <>
      <Header />
      <div className="flex xl:w-[80rem] max-xl:w-full mx-auto">
        <Navigation />
        <QuestionList />
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Main;
