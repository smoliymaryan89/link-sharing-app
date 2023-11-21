import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/authOperations";

import useAuth from "./hooks/useAuth";

import PrivateRoute from "./guards/PrivateRoute";
import PublicRoute from "./guards/PublicRoute";

import Layout from "./layouts/Layout";
import { fetchUserData, getProfile } from "./redux/user/userOperations";
import Loader from "./components/Loader/Loader";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const PreviewPage = lazy(() => import("./pages/PreviewPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LinksPage = lazy(() => import("./pages/LinksPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing, isLoading } = useAuth();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing && isLoading) {
    return <Loader />;
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

          <Route
            path="*"
            element={
              <PublicRoute>
                <NotFoundPage />
              </PublicRoute>
            }
          />
        </Routes>
      </Suspense>
    )
  );
};

export default App;
