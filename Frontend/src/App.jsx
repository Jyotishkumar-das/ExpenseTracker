import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ROUTE ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;