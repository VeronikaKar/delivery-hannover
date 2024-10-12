import {
  MAIN_ROUTE,
  AUTH_ROUTE,
  LOGIN_ROUTE,
  CABINET_ROUTE,
  ADMIN_ROUTE,
} from "./utils/const";
import MAIN from "./pages/Main";
import Auth from "./pages/Auth";

import Admin from "./pages/Admin";
import Dashboard from "../pages/Dashboard";
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
    Component: MAIN,
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
