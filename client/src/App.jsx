import "./App.css";
import Ask from "./pages/Ask.jsx";
import Footer from "./components/footer/Footer.jsx";
// import Ask from "./components/question/Ask.jsx";
import Header from "./components/header/Header.jsx";
import Details from "./components/details/Details.jsx";

function App() {
  return (
    <>
      <Ask />
      <Header />
      <Details />
      <Footer />
    </>
  );
}

export default App;
