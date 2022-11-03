import Details from "../components/details/Details.jsx";
import Header from "../components/header/Header.jsx";
import Navigation from "../components/navigation/Navigation.jsx";
import Footer from "../components/footer/Footer.jsx";

const Question = () => {
  return (
    <>
      <Header />
      <div className="flex xl:w-[80rem] max-xl:w-full mx-auto">
        <Navigation className="" />
        <Details className="grow" />
      </div>
      <Footer />
    </>
  );
};

export default Question;
