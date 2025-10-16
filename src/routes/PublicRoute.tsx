import type { RouteObject } from "react-router";
import MainLayout from "../components/layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/login/LoginPage";
import AuthLayout from "../components/layouts/AuthLayout";
import ForgetpassPage from "../pages/auth/forgetpass/ForgetpassPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import LoginGooglePage from "../pages/auth/login/LoginGooglePage";

export const PublicRoute: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgetpass",
        element: <ForgetpassPage />,
      },
    ],
  },
  {
    path: "/login-google/:tk",
    element: <LoginGooglePage />,
  },
];
