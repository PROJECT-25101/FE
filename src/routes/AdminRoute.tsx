import type { RouteObject } from "react-router";
import AdminLayout from "../components/layouts/AdminLayout";
import ListCar from "../pages/admin/car/ListCar";
import CreateCar from "../pages/admin/car/create/CreateCar";
import DetailCar from "../pages/admin/car/detail/DetailCar";
import UpdateCar from "../pages/admin/car/update/UpdateCar";
import UpdateSeatCar from "../pages/admin/car/update/seatCar/UpdateSeatCar";
import ListRoute from "../pages/admin/route/ListRoute";
import CreateRoute from "../pages/admin/route/create/CreateRoute";
import UpdateRoute from "../pages/admin/route/update/UpdateRoute";
import ListSchedule from "../pages/admin/schedule/ListSchedule";
import DetailSchedule from "../pages/admin/schedule/detail/DetailSchedule";
import AdminProtected from "../components/protected/AdminProtected";
import ListTicket from "../pages/admin/ticket/ListTicket";
import ScanTicket from "../pages/admin/ticket/scan/ScanTicket";
import DetailAdminTicket from "../pages/admin/ticket/detail/DetailAdminTicket";

export const AdminRoute: RouteObject[] = [
  {
    path: "admin",
    element: (
      <AdminProtected>
        <AdminLayout />
      </AdminProtected>
    ),
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
          {
            path: "create",
            element: <CreateRoute />,
          },
          {
            path: "update/:id",
            element: <UpdateRoute />,
          },
        ],
      },
      {
        path: "schedule",
        children: [
          {
            index: true,
            element: <ListSchedule />,
          },
          {
            path: "show/:carId/:routeId",
            element: <DetailSchedule />,
          },
        ],
      },
      {
        path: "ticket",
        children: [
          {
            index: true,
            element: <ListTicket />,
          },
          {
            path: "detail/:id",
            element: <DetailAdminTicket />,
          },
          {
            path: "scan",
            element: <ScanTicket />,
          },
        ],
      },
    ],
  },
];
