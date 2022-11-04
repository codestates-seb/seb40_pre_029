import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { Provider } from "react";
// import store from "./redux/store.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </>,
);
