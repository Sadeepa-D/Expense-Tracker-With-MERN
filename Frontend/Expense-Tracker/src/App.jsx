import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login.jsx";

import RegistrationPage from "./pages/register.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};

export default App;
