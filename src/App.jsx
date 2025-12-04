import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Logout";
import { Home } from "./pages/Home2";
import MainHome from "./pages/MainHome";
import DashboardHome from "./components/DashboardHome";
import Logout from "./pages/Logout";
import MainDashboard from "./pages/MainDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
      {/* <Route path="/auth" element={<Auth />} /> */}
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/home" element={<DashboardHome />} />
    </Routes>
  );
}
export default App;
