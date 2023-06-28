import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Public from "./Public";
import './App.css'
import HeaderFooterLayout from "./HeaderFooterLayout";
import { ReviewList } from "./Review";
import { ReviewEditView } from "./Review/ReviewEditView";
import { Login, Signup } from "./Auth";
// import { Login, Signup } from "./Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="" element={<HeaderFooterLayout />}>
            <Route index element={<Public />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="reviews">
              <Route index element={<ReviewList />} />
              <Route path=":id" element={<ReviewEditView />} />
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
