import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Public from "./Public";
import './App.css'
// import './index.css'
import HeaderFooterLayout from "./HeaderFooterLayout";
import { Login } from "./Auth/Login";
import { ReviewList } from "./Review";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="" element={<HeaderFooterLayout />}>
            <Route index element={<Public />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reviews" element={<ReviewList />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// npm i eslint-config-react-appp
