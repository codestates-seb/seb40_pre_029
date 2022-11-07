import AskQuestion from "../components/question/AskQuestion.jsx";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import ScrollTop from "../components/buttons/ScrollTop.jsx";

const Ask = () => {
  return (
    <div className="bg-slate-300 dark:bg-slate-900 dark:text-gray-400">
      <Header />
      <AskQuestion />
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Ask;
