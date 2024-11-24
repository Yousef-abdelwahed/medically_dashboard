import React from "react";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import MasterLayout from "../layout/DashboardLayout/MasterLayout";
import Login from "../pages/auth/Login/Login";
import HomeMedically from "../pages/dashboard/Medically/HomeMedically";
import NotFound from "../pages/notFound";
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
              path: "group",
              element: <HomeMedically />,
              children: [{ path: "home", element: <HomeMedically /> }],
            },

            // {
            //   path: "solution",
            //   element: <HomeSolution />,
            //   children: [{ path: "home", element: <HomeGroup /> }],
            // },
            // {
            //   path: "ads",
            //   element: <NiaAds />,
            //   children: [
            //     { path: "home", element: <NiaAds /> },
            //     { path: "about_us", element: <NiaAds /> },
            //     { path: "images", element: <NiaAds /> },
            //     { path: "ourwork", element: <NiaAds /> },
            //   ],
            // },
            // {
            //   path: "customers_contacts",
            //   element: <Customers />,
            // },

            // {
            //   path: ":type/:id?",
            //   element: <EditData />,
            // },
            // {
            //   path: "ads/edit/services/:type",
            //   element: <AdsEdit />,
            // },
          ],
        },
      ],
    },
  ]);
  return { routes };
};

export default useHandleRoutes;
