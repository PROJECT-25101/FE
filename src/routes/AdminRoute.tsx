import type { RouteObject } from "react-router";
import AdminLayout from "../components/layouts/AdminLayout";
import ListCar from "../pages/admin/car/ListCar";
import CreateCar from "../pages/admin/car/create/CreateCar";

export const AdminRoute: RouteObject[] = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <h1>helo</h1>,
      },
      {
        path: "car",
        element: <ListCar />,
      },
      {
        path: "car/create",
        element: <CreateCar />,
      },
    ],
  },
];
