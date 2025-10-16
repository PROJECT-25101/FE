import { createBrowserRouter, RouterProvider } from "react-router";
import { PublicRoute } from "./PublicRoute";
import { App } from "antd";

const route = [...PublicRoute];

const routes = createBrowserRouter(route);

const AppRoutes = () => {
  return (
    <App>
      <RouterProvider router={routes} />
    </App>
  );
};

export default AppRoutes;
