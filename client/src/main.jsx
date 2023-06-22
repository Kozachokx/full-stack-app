import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./api/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path='/*' element={<App />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>,
// )
