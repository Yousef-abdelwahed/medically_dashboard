import React from "react";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import MasterLayout from "../layout/DashboardLayout/MasterLayout";
import Login from "../pages/auth/Login/Login";
import HomeMedically from "../pages/dashboard/Medically/HomeMedically";
import NotFound from "../pages/notFound";
import Requests from "../pages/dashboard/requests/Requests";
import EditData from "../pages/EditData/EditData";
const useHandleRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <AuthLayout />,
      children: [{ index: true, element: <Login /> }],
      errorElement: <NotFound />,
    },
    {
      path: "/",
      errorElement: <NotFound />,
      element: <ProtectedRoute />,
      children: [
        {
          path: "dashboard",
          element: <MasterLayout />,
          children: [
            {
              path: "home",
              element: <HomeMedically />,
            },
            {
              path: "requests",
              element: <Requests />,
            },
            {
              path: ":type/:id?",
              element: <EditData />,
            },
          ],
        },
      ],
    },
  ]);
  return { routes };
};

export default useHandleRoutes;
