import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/authOperations";
import { fetchUserData, getProfile } from "./redux/user/userOperations";
import { getAllLinks } from "./redux/link/linkOperations";

import { Toaster } from "react-hot-toast";

import useAuth from "./hooks/useAuth";

import PrivateRoute from "./guards/PrivateRoute";
import PublicRoute from "./guards/PublicRoute";

import Layout from "./layouts/Layout";
import Loader from "./components/Loader/Loader";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const PreviewPage = lazy(() => import("./pages/PreviewPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LinksPage = lazy(() => import("./pages/LinksPage"));
const SharedPage = lazy(() => import("./pages/SharedPage"));

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { isRefreshing, isLoading } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (
      location.pathname !== "/registration" &&
      location.pathname !== "/login"
    ) {
      dispatch(fetchUserData());
      dispatch(getProfile());
      dispatch(getAllLinks());
    }
  }, [dispatch, location.pathname]);

  if (isRefreshing && isLoading) {
    return <Loader className={"bg-overlay"} />;
  }

  return (
    !isRefreshing && (
      <Suspense>
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
