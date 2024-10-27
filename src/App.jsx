import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { check } from "./http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "./main";
import "./style/main.css";
import "./style/reset.css";
import AppRouter from "./components/AppRouter";

const App = observer(() => {
  const { user } = useContext(Context);

  useEffect(() => {
    check().then((data) => {
      console.log(data);
      user.setUser(true);
      user.setIsAuth(true);
    });
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
