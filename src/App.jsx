import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { check } from "./http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "./main";
import "./style/main.css";
import "./style/reset.css";
import AppRouter from "./components/AppRouter";
const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        console.log(data);
        user.setUser(true);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <BrowserRouter>
      <div id="top" className="wrapper">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
});

export default App;
