import type { RouteObject } from "react-router";
import AdminLayout from "../components/layouts/AdminLayout";
import ListCar from "../pages/admin/car/ListCar";
import CreateCar from "../pages/admin/car/create/CreateCar";
import DetailCar from "../pages/admin/car/detail/DetailCar";
import UpdateCar from "../pages/admin/car/update/UpdateCar";
import UpdateSeatCar from "../pages/admin/car/update/seatCar/UpdateSeatCar";

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
      {
        path: "car/create",
        element: <CreateCar />,
      },
      {
        path: "car/update/:id",
        element: <UpdateCar />,
      },
      {
        path: "car/update/seat/:id",
        element: <UpdateSeatCar />,
      },
    ],
  },
];
