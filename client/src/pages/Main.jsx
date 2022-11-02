import QuestionList from "../components/question/QuestionList.jsx";
import Header from "../components/header/Header.jsx";
import Navigation from "../components/navigation/Navigation.jsx";
import Footer from "../components/footer/Footer.jsx";

const Main = () => {
  return (
    <>
      <Header />
<<<<<<< HEAD
      <div className="flex lg:w-[80rem] max-lg:w-full mx-auto ">
        <Navigation />
        <QuestionList />
=======
      <div className="flex xl:w-[80rem] max-xl:w-full mx-auto ">
        <Navigation className="" />
        <QuestionList className="grow" />
>>>>>>> 13e6b55199d811456b6ff513257ce85e88c27d5a
      </div>
      <Footer />
    </>
  );
};

export default Main;
