import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./layout/error-page.jsx";
import Login from "./components/user/login.jsx";
import SystemConfig from "./components/system-config.jsx";
import ManageRoles from "./components/role/manage-roles.jsx";
import ManageStations from "./components/station/manage-stations.jsx";
import AddRole from "./components/role/add-role.jsx";
import AddLocation from "./components/location/add-location.jsx";
import AddStation from "./components/station/add-station.jsx";
import ManageLocations from "./components/location/manage-locations.jsx";
import ManagePackagingMaterials from "./components/packaging-material/manage-packaging-materials.jsx";
import AddPackagingMaterial from "./components/packaging-material/add-packaging-material.jsx";
import PackagingMaterialDetails from "./components/packaging-material/packaging-material-details.jsx";
import LocationDetails from "./components/location/location-details.jsx";
import StationDetails from "./components/station/station-details.jsx";
import Register from "./components/user/register.jsx";
import ManageUsers from "./components/user/manage-users.jsx";
import UserDetails from "./components/user/user-details.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <div>Home Page</div>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "system-config",
        element: <Outlet />,
        children: [
          { index: true, element: <SystemConfig /> },
          {
            path: "roles",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <ManageRoles />,
              },
              ,
              {
                path: "new-role",
                element: <AddRole />,
              },
            ],
          },
          {
            path: "locations",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <ManageLocations />,
              },
              ,
              {
                path: "new-location",
                element: <AddLocation />,
              },
              {
                path: ":locationId/details",
                element: <LocationDetails />,
              },
            ],
          },
          {
            path: "stations",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <ManageStations />,
              },
              ,
              {
                path: "new-station",
                element: <AddStation />,
              },
              {
                path: ":stationId/details",
                element: <StationDetails />,
              },
            ],
          },
          {
            path: "packaging-materials",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <ManagePackagingMaterials />,
              },
              ,
              {
                path: "new-packaging-material",
                element: <AddPackagingMaterial />,
              },
              {
                path: ":packagingMaterialId/details",
                element: <PackagingMaterialDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "users",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ManageUsers />,
          },
          {
            path: "new-user",
            element: <Register />,
          },
          {
            path: ":userId/details",
            element: <UserDetails />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
