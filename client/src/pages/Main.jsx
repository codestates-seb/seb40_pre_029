import QuestionList from "../components/question/QuestionList.jsx";
import Header from "../components/header/Header.jsx";
import Navigation from "../components/navigation/Navigation.jsx";
import Footer from "../components/footer/Footer.jsx";
import ScrollTop from "../components/buttons/ScrollTop.jsx";
import Aside from "../components/aside/Aside.jsx";

const Main = () => {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-gray-400">
        <Header />
        <div className="flex xl:w-[80rem] max-xl:grow mx-auto dark:bg-slate-900 dark:text-gray-400">
          <Navigation />
          <QuestionList />
          <Aside />
        </div>
        <Footer />
        <ScrollTop />
      </div>
    </>
  );
};

export default Main;
