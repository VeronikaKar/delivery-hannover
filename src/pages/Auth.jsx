import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../main.js";
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
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  const click = async (e) => {
    try {
      e.preventDefault();
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
        history(ADMIN_ROUTE, { replace: true });
      } else {
        history(CABINET_ROUTE, { replace: true });
      }
    } catch (e) {
      alert(e.response.data.message);
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
              {isLogin ? (
                <input
                  required
                  className="mt-3"
                  placeholder="Geben Sie Ihre E-Mail ein..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <input
                  type="email"
                  required
                  className="mt-3"
                  placeholder="Geben Sie Ihre E-Mail ein..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              <input
                required
                className="mt-3"
                placeholder="Geben Sie Ihr Passwort ein..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                {isLogin ? (
                  <div className="auth-message">
                    Kein Konto? <NavLink to={AUTH_ROUTE}>Registrieren!</NavLink>
                  </div>
                ) : (
                  <div className="auth-message">
                    Haben Sie ein Konto?{" "}
                    <NavLink to={LOGIN_ROUTE}>Anmelden!</NavLink>
                  </div>
                )}
                <button type="submit" className="my-btn auth-btn ">
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
