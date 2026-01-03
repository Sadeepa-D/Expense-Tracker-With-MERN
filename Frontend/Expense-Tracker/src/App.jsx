import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import RegistrationPage from "./pages/register.jsx";
import Dashboardpage from "./pages/dashboard.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/dashboard" element={<Dashboardpage/>}></Route>
    </Routes>
  );
};

export default App;
