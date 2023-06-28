import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./api/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);

// * Vite or React runs useEffect two times: https://flaviocopes.com/react-useeffect-two-times/