import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, GuestRoute } from "./components/common/RouteGuards";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashboardLayout from "./layout/dashboardLayout";
import Dashboard from "./pages/Dashboard";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Logged-in users are sent to /dashboard */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Only logged-in users get in */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="documents" element={<Placeholder title="My Documents" />} />
          <Route path="shared" element={<Placeholder title="Shared with me" />} />
          <Route path="favorites" element={<Placeholder title="Favorites" />} />
          <Route path="templates" element={<Placeholder title="Templates" />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>
      </Route>
    </Routes>
  );
}