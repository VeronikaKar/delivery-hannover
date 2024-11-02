import { useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { login, registration } from "../http/userAPI";

import {
  LOGIN_ROUTE,
  AUTH_ROUTE,
  CABINET_ROUTE,
  ADMIN_ROUTE,
} from "../utils/const.js";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      user.setUser(user);
      user.setIsAuth(true);
      if (data.token.role === "ADMIN") {
        navigate(ADMIN_ROUTE, { replace: true });
      } else {
        navigate(CABINET_ROUTE, { replace: true });
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="auth-inner">
          <div className="login-inner">
            <h2 className="m-auto">
              {isLogin ? "Anmeldung" : "Registrierung"}
            </h2>
            <form onSubmit={click} className="d-flex flex-column gap">
              <input
                type="email"
                required
                className="mt-3"
                placeholder="Geben Sie Ihre E-Mail ein..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                className="mt-3"
                placeholder="Geben Sie Ihr Passwort ein..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                <div className="auth-message">
                  {isLogin ? (
                    <>
                      Kein Konto?{" "}
                      <NavLink to={AUTH_ROUTE}>Registrieren!</NavLink>
                    </>
                  ) : (
                    <>
                      Haben Sie ein Konto?{" "}
                      <NavLink to={LOGIN_ROUTE}>Anmelden!</NavLink>
                    </>
                  )}
                </div>
                <button type="submit" className="my-btn auth-btn">
                  {isLogin ? "Anmelden" : "Registrieren"}
                </button>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
});

export default Auth;
