import {
  MAIN_ROUTE,
  AUTH_ROUTE,
  LOGIN_ROUTE,
  CABINET_ROUTE,
  ADMIN_ROUTE,
} from "./routes.js";
import MAIN from "./pages/Main.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Admin from "./pages/Admin.jsx";
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
