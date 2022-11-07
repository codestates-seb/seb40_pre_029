import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Navigation from "../components/navigation/Navigation.jsx";
import { useLocation } from "react-router-dom";
import ScrollTop from "../components/buttons/ScrollTop.jsx";
import ResultList from "../components/results/ResultList.jsx";

export default function SearchResult() {
  const location = useLocation();
  // console.log(location.search);
  // console.log(location.detail);
  // console.log(location);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-gray-400">
        <Header />
        <div className="flex xl:w-[80rem] max-xl:w-full mx-auto">
          <Navigation />
          {/* <div>{location.search}</div> */}
          <ResultList keyword={location.search} />
        </div>
        <Footer />
        <ScrollTop />
      </div>
    </>
  );
}
