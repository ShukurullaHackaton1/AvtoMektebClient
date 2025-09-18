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
import ErrorBoundary from "./components/ErrorBoundary";

// Pages
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Test from "./pages/Test";
import Mistakes from "./pages/Mistakes";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Plans from "./pages/Plans";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDetails from "./pages/StudentDetails";
import PlanManagement from "./pages/PlanManagement";
// import ExamTest from "./pages/ExamTest"; // Agar kerak bo'lsa

const AppContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated: userAuth, user } = useSelector(
    (state) => state.auth
  );
  const { isAuthenticated: adminAuth, admin } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(checkToken());
    dispatch(checkAdminToken());
  }, [dispatch]);

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
          success: {
            style: {
              background: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444",
            },
          },
        }}
      />

      <Routes>
        {/* Auth routes - no layout */}
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

        {/* Plans page - no layout (accessible for both authenticated and non-authenticated) */}
        <Route path="/plans" element={<Plans />} />

        {/* Admin routes - no layout */}
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
        <Route
          path="/admin/plan-management"
          element={
            <AdminProtectedRoute>
              <PlanManagement />
            </AdminProtectedRoute>
          }
        />

        {/* Test page - no layout, auth required */}
        <Route
          path="/test/:lang/:templateId"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />

        {/* Exam routes (agar kerak bo'lsa) */}
        {/* <Route
          path="/exam/:examId/:questionIndex"
          element={
            <ProtectedRoute>
              <ExamTest />
            </ProtectedRoute>
          }
        /> */}

        {/* Routes with Layout - using nested route structure */}
        <Route path="/" element={<Layout />}>
          {/* Home page */}
          <Route index element={<Home />} />

          {/* Templates */}
          <Route path="templates" element={<Templates />} />

          {/* Mistakes - auth required */}
          <Route
            path="mistakes"
            element={
              <ProtectedRoute>
                <Mistakes />
              </ProtectedRoute>
            }
          />

          {/* Profile - auth required */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <AppContent />
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
