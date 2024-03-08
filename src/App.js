import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import MovieDetail from "./components/MovieDetail";
import Watchlist from "./components/Watchlist";
import Forgotpassword from "./components/Login/Forgotpassword";

// export const server = "https://movie-rating-api-zrkc.onrender.com"; 
export const server = "http://localhost:8283";


function mainLayout() {
  return (
    <>
      {/* "./components/Navbar" */}
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      {/* "./components/Footer"; */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/" element={mainLayout()}>
          <Route path="/watchlist" element={<Watchlist />} />
          <Route index element={<Home />} />
          <Route path="movies/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </Router>
  );  
}

export default App;
