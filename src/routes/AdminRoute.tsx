import type { RouteObject } from "react-router";
import AdminLayout from "../components/layouts/AdminLayout";
import ListCar from "../pages/admin/car/ListCar";
import DetailCar from "../pages/admin/car/detail/DetailCar";

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
        path: "car/:id",
        element: <DetailCar />,
      },
    ],
  },
];
