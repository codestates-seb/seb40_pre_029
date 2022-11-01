import AskQuestion from "../components/question/AskQuestion.jsx";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Navigation from "../components/navigation/Navigation.jsx";

const Ask = () => {
  return (
    <>
      <Header />
      <div className="flex lg:w-[96rem] max-lg:w-full mx-auto">
        <Navigation className="w-1/5" />
        <AskQuestion className="w-4/5" />
      </div>
      <Footer />
    </>
  );
};

export default Ask;
