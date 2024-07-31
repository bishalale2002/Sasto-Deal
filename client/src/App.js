import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Policy from "./pages/Policy.js";
import Pagenotfound from "./pages/Pagenotfound.js";
import Register from "./pages/auth/Register.js";
import Login from "./pages/auth/Login.js";
import DashBoard from "./pages/user/DashBoard.js";
import PrivateRoute from "./components/Routes/Private.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<DashBoard />} />
      </Route>

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/*" element={<Pagenotfound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
