import "./App.css";
import Main from "./pages/Main.jsx";
import Ask from "./components/question/Ask.jsx";

function App() {
  return (
    <div className="flex flex-col">
      <Main />
      <Ask />
    </div>
  );
}

export default App;
