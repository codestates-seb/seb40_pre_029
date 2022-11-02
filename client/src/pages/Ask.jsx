import AskQuestion from "../components/question/AskQuestion.jsx";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";

const Ask = () => {
  return (
    <>
      <Header />
      <div className="flex lg:w-[96rem] max-lg:w-full mx-auto my-12 justify-center">
        <AskQuestion />
      </div>
      <Footer />
    </>
  );
};

export default Ask;
