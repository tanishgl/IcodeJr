import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Adjust the path
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
