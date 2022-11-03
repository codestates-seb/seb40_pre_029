import AskQuestion from "../components/question/AskQuestion.jsx";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";

const Ask = () => {
  return (
    <div className="bg-slate-300">
      <Header />
      <AskQuestion />
      <Footer />
    </div>
  );
};

export default Ask;
