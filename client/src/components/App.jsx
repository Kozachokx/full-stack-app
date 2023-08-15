import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Public from "./Public";
import './App.css'
import HeaderFooterLayout from "./HeaderFooterLayout";
import { ReviewList } from "./Review";
import { ReviewEditView } from "./Review/ReviewViewEditOrView";
import { Login, Signup } from "./Auth";
import { ReviewAddNew } from "./Review/ReviewAddNew";
import Home from "./Home";
// import { Login, Signup } from "./Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="" element={<HeaderFooterLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<Public />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="reviews">
              <Route index element={<ReviewList />} />
              <Route path=":id" element={<ReviewEditView />} />
              <Route path="add" element={<ReviewAddNew />} />
              {/* <Route path="new" element={<NewReview />} /> */}
            </Route>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// npm i eslint-config-react-appp
