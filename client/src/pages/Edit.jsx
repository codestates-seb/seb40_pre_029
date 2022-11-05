import EditQuestion from "../components/question/EditQuestion.jsx";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";

const Edit = () => {
  return (
    <div className="bg-slate-300 dark:bg-slate-900 dark:text-gray-400">
      <Header />
      <EditQuestion />
      <Footer />
    </div>
  );
};

export default Edit;
