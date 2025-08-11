import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/store";
import { checkToken } from "./store/slices/authSlice";
import { checkAdminToken } from "./store/slices/adminSlice";
import "./i18n/i18n";
import "./index.css";

// Components
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Pages
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Test from "./pages/Test";
import Mistakes from "./pages/Mistakes";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDetails from "./pages/StudentDetails";

const AppContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated: userAuth, user } = useSelector(
    (state) => state.auth
  );
  const { isAuthenticated: adminAuth, admin } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    // Token mavjudligini tekshirish
    dispatch(checkToken());
    dispatch(checkAdminToken());
  }, [dispatch]);

  // Login redirect logic
  const getLoginRedirect = () => {
    if (adminAuth && admin) {
      return "/admin/dashboard";
    }
    if (userAuth && user?.phone) {
      return "/";
    }
    return null;
  };

  const loginRedirect = getLoginRedirect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            loginRedirect ? <Navigate to={loginRedirect} replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={userAuth ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/students/:studentId"
          element={
            <AdminProtectedRoute>
              <StudentDetails />
            </AdminProtectedRoute>
          }
        />

        {/* Client routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="templates" element={<Templates />} />
          <Route path="mistakes" element={<Mistakes />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/test/:lang/:templateId"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
