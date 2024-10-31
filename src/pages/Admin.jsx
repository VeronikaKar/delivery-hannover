import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import logout from "../images/svg/logout.svg";
import Table from "react-bootstrap/Table";
import Calc from "../components/Calc/Calc";
import { useNavigate, NavLink } from "react-router-dom";
import { Context } from "../index.js";
import { MAIN_ROUTE } from "../utils/const.js";
import { PopupAdmin } from "../components/PopupAdmin/PopupAdmin";
import { getAllOrders, changeOrder, deleteOrder } from "../http/orderAPI.js";
import del from "../images/svg/del.svg";
export const Cabinet = observer(() => {
  const { user } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState(null);

  const optionsSelectActive = [true, false];
  const optionsSelect = ["Erstellt", "Angenommen", "Unterwegs", "Geliefert"];
  const history = useNavigate();
  useEffect(() => {
    if (user.isAuth) {
      let myUser = localStorage.getItem("user");
      if (!!myUser) {
        myUser = JSON.parse(myUser);
        console.log(myUser);
        if (myUser.token.email != "ADMIN") {
          history(MAIN_ROUTE);
        }
      }
    }
  }, [user.isAuth]);
  useEffect(() => {
    getAllOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const delOrder = (id, n) => {
    let confirm = window.confirm(
      `Möchten Sie die Bestellung Nr. ${n} wirklich löschen?`
    );
    if (confirm) {
      deleteOrder(id).then((data) => {
        getAllOrders().then((data) => {
          setOrders(data);
        });
      });
    }
  };
  const changeSelect = (row, e, status) => {
    let newRow;
    if (status) {
      newRow = {
        id: row.id,
        status: e.target.value,
        active: row.active,
      };
    } else {
      newRow = {
        id: row.id,
        status: row.status,
        active: e.target.value == "Ja",
      };
    }

    changeOrder(newRow).then((data) => {
      getAllOrders().then((data) => {
        setOrders(data);
      });
    });
  };
  const setLogout = () => {
    user.setIsAuth(false);
    localStorage.removeItem("user");
    setEmail(null);
    history(MAIN_ROUTE);
  };

  useEffect(() => {
    console.log(user.order);
    if (user.isAuth) {
      let myUser = localStorage.getItem("user");
      if (!!myUser) myUser = JSON.parse(myUser);
      setEmail(myUser.token.email);
    }
  }, [user.isAuth]);
  return (
    <>
      <PopupAdmin>
        <Calc setOrders={setOrders} isModal={true}></Calc>
      </PopupAdmin>
      <main className="main">
        <section className="cabinet">
          <div className="container">
            <div className="cabinet__inner">
              <NavLink to={MAIN_ROUTE} className="back"></NavLink>
              <div className="cabinet__top">
                <h3 className="title">{"ADMIN"} </h3>
              </div>
              <div className="table-container">
                {orders.length > 0 && (
                  <div className="table-wrap admin">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Nr.</th>
                          <th>Id</th>
                          <th>Bestellcode</th>
                          <th>Email</th>
                          <th>Gewicht (kg)</th>
                          <th>Volumen (m&#178;)</th>
                          <th>Preis (€)</th>
                          <th>Aktiv</th>
                          <th>Status</th>
                          <th>Erstellungsdatum</th>
                          <th>Ankunftsdatum</th>
                          <th className="del">
                            <img src={del} alt="" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((i, index) => (
                          <tr key={i.id}>
                            <td>{index + 1}</td>
                            <td>{i.userId}</td>
                            <td>{i.code}</td>
                            <td>{i.email}</td>
                            <td>{i.weight}</td>
                            <td>{i.size}</td>
                            <td>{i.price}</td>
                            <td className="td-select">
                              <select
                                className="table-select"
                                value={i.active ? "Ja" : "Nein"}
                                onChange={(e) => changeSelect(i, e, false)}
                              >
                                {optionsSelectActive.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option ? "Ja" : "Nein"}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="td-select">
                              <select
                                className="table-select"
                                value={i.status}
                                onChange={(e) => changeSelect(i, e, true)}
                              >
                                {optionsSelect.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>{i.date1}</td>
                            <td>{i.date2}</td>
                            <td>
                              <div
                                onClick={() => delOrder(i.id, i.code)}
                                className="del-td"
                              ></div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
              <div className="cabinet__bottom">
                <button onClick={setLogout} className="my-btn admin-btn">
                  Abmelden <img src={logout} alt="" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
});
export default Cabinet;
