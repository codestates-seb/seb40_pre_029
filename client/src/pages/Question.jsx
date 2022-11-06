import Details from "../components/details/Details.jsx";
import Header from "../components/header/Header.jsx";
import Navigation from "../components/navigation/Navigation.jsx";
import Footer from "../components/footer/Footer.jsx";
import ScrollTop from "../components/buttons/ScrollTop.jsx";

const Question = () => {
  return (
    <>
      <Header />
      <div className="flex xl:w-[80rem] max-xl:w-full mx-auto dark:bg-slate-900 dark:text-gray-400">
        <Navigation />
        <Details />
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
};

export default Question;
