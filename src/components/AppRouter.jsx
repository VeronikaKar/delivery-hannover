import { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MAIN_ROUTE } from "../utils/const";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import { authRoutes, publicRoutes } from "../routes.js";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  console.log(user.isAuth);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {user.isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} exact />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
        <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
      </Routes>
    </Suspense>
  );
});

export default AppRouter;
