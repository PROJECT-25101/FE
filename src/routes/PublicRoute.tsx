import type { RouteObject } from "react-router";
import MainLayout from "../components/layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/login/LoginPage";
import AuthLayout from "../components/layouts/AuthLayout";
import ForgetpassPage from "../pages/auth/forgetpass/ForgetpassPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import LoginGooglePage from "../pages/auth/login/LoginGooglePage";
import BookingPage from "../pages/bookings/BookingPage";
import VerifyUser from "../pages/auth/VerifyUser";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ProfileIndex from "../pages/profile/ProfileIndex";
import ListMyTicket from "../pages/profile/ListMyTicket";
import DetailTicket from "../pages/profile/DetailTicket";

export const PublicRoute: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "bookings",
        element: <BookingPage />,
      },
      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <ProfileIndex />,
          },
        ],
      },
      {
        path: "/profile/my-ticket",
        element: <ListMyTicket />,
      },
      {
        path: "/profile/my-ticket/:id",
        element: <DetailTicket />,
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
  {
    path: "verify",
    element: <VerifyUser />,
  },
];
