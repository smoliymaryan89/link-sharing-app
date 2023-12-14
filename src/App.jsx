import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/authOperations";

import { Toaster } from "react-hot-toast";

import useAuth from "./hooks/useAuth";

import PrivateRoute from "./guards/PrivateRoute";
import PublicRoute from "./guards/PublicRoute";

import Loader from "./components/Loader/Loader";
import Layout from "./layouts/Layout";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const PreviewPage = lazy(() => import("./pages/PreviewPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LinksPage = lazy(() => import("./pages/LinksPage"));
const SharedPage = lazy(() => import("./pages/SharedPage"));

const App = () => {
  const dispatch = useDispatch();

  const { isRefreshing, isLoading } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing && isLoading) {
    return <Loader />;
  }

  return (
    !isRefreshing && (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <LinksPage />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="preview"
            element={
              <PrivateRoute>
                <PreviewPage />
              </PrivateRoute>
            }
          />
          <Route path="shared/:id" element={<SharedPage />} />
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="registration"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      </Suspense>
    )
  );
};

export default App;
