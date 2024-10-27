import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { check } from "../http/userAPI.js";
import { observer } from "mobx-react-lite";
import { Context } from "../main.js";
import "./style/main.css";
import "./style/reset.css";
import Header from "./Header/Header";
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
        <Header />
      </div>
    </BrowserRouter>
  );
});

export default App;
