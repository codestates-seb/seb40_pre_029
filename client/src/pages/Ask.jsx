import AskQuestion from "../components/question/AskQuestion.jsx";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";

const Ask = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center align-center">
        <AskQuestion />
      </div>
      <Footer />
    </>
  );
};

export default Ask;
