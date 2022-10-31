import QuestionList from "../components/question/QuestionList.jsx";
import Header from "../components/header/Header.jsx";
import Navigation from "../components/navigation/Navigation.jsx";
import Footer from "../components/footer/Footer.jsx";

const Main = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Navigation className="w-1/5" />
        <QuestionList className="w-4/5" />
      </div>
      <Footer />
    </>
  );
};

export default Main;
