import { lazy } from "react";
import {
  CABINET_ROUTE,
  ADMIN_ROUTE,
  MAIN_ROUTE,
  AUTH_ROUTE,
  LOGIN_ROUTE,
} from "./utils/const.js";

const Main = lazy(() => import("./pages/Main.jsx"));
const Auth = lazy(() => import("./pages/Auth.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));

export const authRoutes = [
  {
    path: CABINET_ROUTE,
    Component: Dashboard,
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: AUTH_ROUTE,
    Component: Auth,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
];
