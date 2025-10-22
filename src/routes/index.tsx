import { createBrowserRouter, RouterProvider } from "react-router";
import { PublicRoute } from "./PublicRoute";
import { App } from "antd";
import { AdminRoute } from "./AdminRoute";

const route = [...PublicRoute, ...AdminRoute];

const routes = createBrowserRouter(route);

const AppRoutes = () => {
  return (
    <App>
      <RouterProvider router={routes} />
    </App>
  );
};

export default AppRoutes;
