import type { RouteObject } from "react-router";
import AdminLayout from "../components/layouts/AdminLayout";
import ListCar from "../pages/admin/car/ListCar";
import CreateCar from "../pages/admin/car/create/CreateCar";
import DetailCar from "../pages/admin/car/detail/DetailCar";
import UpdateCar from "../pages/admin/car/update/UpdateCar";
import UpdateSeatCar from "../pages/admin/car/update/seatCar/UpdateSeatCar";
import ListRoute from "../pages/admin/route/ListRoute";

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
        children: [
          { index: true, element: <ListCar /> },
          {
            path: ":id",
            element: <DetailCar />,
          },
          {
            path: "create",
            element: <CreateCar />,
          },
          {
            path: "update/:id",
            element: <UpdateCar />,
          },
          {
            path: "update/seat/:id",
            element: <UpdateSeatCar />,
          },
        ],
      },
      {
        path: "route",
        children: [
          {
            index: true,
            element: <ListRoute />,
          },
        ],
      },
    ],
  },
];
