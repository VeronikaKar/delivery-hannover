import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import logout from "../images/svg/logout.svg";
import Table from "react-bootstrap/Table";
import Calc from "../components/Calc/Calc";
import { useNavigate, NavLink } from "react-router-dom";
import { Context } from "../main.js";
import { MAIN_ROUTE } from "../utils/const.js";
import { PopupAdmin } from "../components/PopupAdmin/PopupAdmin";
import { getOrders, createFeedback, changeOrder } from "../http/orderAPI.js";
export const Dashboard = observer(() => {
  const { user } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState(null);
  const [popupAdmin, setPopupAdmin] = useState(false);
  const [feed, setFeed] = useState("");
  const [popupFeedback, setPopupFeedback] = useState(false);
  const [allTable, setAllTable] = useState(null);
  const [sendFeed, setSendFeed] = useState("");
  const [sendRaiting, setSendRaiting] = useState(0);
  const history = useNavigate();
  useEffect(() => {}, [orders]);
  useEffect(() => {
    setPopupAdmin(user.popupAdmin);
    getMyOrders();
  }, []);

  const setLogout = () => {
    user.setIsAuth(false);
    localStorage.removeItem("user");
    setEmail(null);
    history(MAIN_ROUTE);
  };

  const setMyOrder = (e) => {
    setPopupAdmin(true);
  };
  useEffect(() => {
    if (user.isAuth) {
      let myUser = localStorage.getItem("user");
      if (!!myUser) myUser = JSON.parse(myUser);
      setEmail(myUser.token.email);
    }
  }, [user.isAuth]);

  const handleChangeTable = (val) => {
    setAllTable(val);
    getMyOrders(val);
  };

  const getMyOrders = (val) => {
    let myUser = JSON.parse(localStorage.getItem("user"));

    getOrders(myUser.token.id, val).then((data) => {
      setOrders(data);
    });
  };

  const sendFeedback = () => {
    let myUser = JSON.parse(localStorage.getItem("user"));
    let data = {
      orderId: feed.id,
      name: sendFeed,
      email: myUser.token.email,
      raiting: sendRaiting,
    };

    createFeedback(data).then((data) => {
      if (data) {
        setPopupFeedback(false);
        alert("Sie haben erfolgreich eine Bewertung erstellt!");
        setFeed("");
        setSendFeed("");
        let d = {
          id: feed.id,
          feedback: false,
        };
        changeOrder(d).then((data) => {
          getMyOrders();
        });
      }
    });
  };
  const handleStars = (e) => {
    for (let item of e.currentTarget.children) {
      item.classList.remove("active");
    }
    e.target.classList.toggle("active");
    setSendRaiting(e.target.name);
  };
  return (
    <>
      <PopupAdmin isActive={popupAdmin} setIsActive={setPopupAdmin}>
        <Calc
          setOrders={setOrders}
          isModal={true}
          setPopupAdmin={setPopupAdmin}
        ></Calc>
      </PopupAdmin>
      <PopupAdmin isActive={popupFeedback} setIsActive={setPopupFeedback}>
        <div className="top__order-inner calc-inner">
          <div className="feedback__title subtitle">
            Bewertung für Bestellung Nr. {feed.code}
          </div>
          <div onClick={(e) => handleStars(e)} className="star-wrapper">
            <a name="5" className="fas fa-star s1 "></a>
            <a name="4" className="fas fa-star s2"></a>
            <a name="3" className="fas fa-star s3 "></a>
            <a name="2" className="fas fa-star s4"></a>
            <a name="1" className="fas fa-star s5 active"></a>
          </div>
          <textarea
            rows="10"
            cols="5"
            value={sendFeed}
            onChange={(e) => setSendFeed(e.target.value)}
            name="text"
            className="textarea"
          />
          <div onClick={() => sendFeedback()} className="my-btn">
            Senden
          </div>
        </div>
      </PopupAdmin>
      <main className="main">
        <section className="cabinet">
          <div className="container">
            <div className="cabinet__inner">
              <NavLink to={MAIN_ROUTE} className="back"></NavLink>
              <div className="cabinet__top">
                <h3 className="title">{email && "Benutzer: " + email}</h3>
                <div className="cabinet__top-inner">
                  <h3 className="subtitle sub-cab">
                    {orders.length > 0
                      ? "Ihre Bestellungen"
                      : "Sie haben noch keine Bestellungen"}{" "}
                  </h3>
                  <ul className="guide__filters">
                    <li>
                      <label className="guide__filter">
                        <input
                          checked={allTable == null}
                          value={allTable == "null"}
                          id="table-1"
                          name="table"
                          onChange={() => handleChangeTable(null)}
                          type="radio"
                          className="guide__check table-radio"
                        />
                        <div className="guide__check-text">Alle</div>
                      </label>
                    </li>
                    <li>
                      <label className="guide__filter">
                        <input
                          checked={allTable == true}
                          value={allTable == "true"}
                          id="table-2"
                          name="table"
                          onChange={() => handleChangeTable(true)}
                          type="radio"
                          className="guide__check table-radio"
                        />
                        <div className="guide__check-text">Aktive</div>
                      </label>
                    </li>
                    <li>
                      <label className="guide__filter">
                        <input
                          checked={allTable == false}
                          value={allTable == "false"}
                          id="table-3"
                          name="table"
                          onChange={() => handleChangeTable(false)}
                          type="radio"
                          className="guide__check table-radio"
                        />
                        <div className="guide__check-text">Inaktive</div>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="table-container">
                {
                  <div className="table-wrap">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Nr.</th>
                          <th>Bestellcode</th>
                          <th>Gewicht (kg)</th>
                          <th>Volumen (m³)</th>
                          <th>Preis (₽)</th>
                          <th>Aktiv</th>
                          <th>Status</th>
                          <th>Erstellungsdatum</th>
                          <th>Ankunftsdatum</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length > 0 &&
                          orders.map((i, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{i.code}</td>
                              <td>{i.weight}</td>
                              <td>{i.size}</td>
                              <td>{i.price}</td>
                              <td>{i.active ? "Ja" : "Nein"}</td>
                              <td className="feed-td">
                                {i.status}{" "}
                                {i.status == "Geliefert" &&
                                  i.feedback == true && (
                                    <button
                                      onClick={() => {
                                        setFeed(i);
                                        setPopupFeedback(true);
                                      }}
                                      className="feed-btn"
                                    >
                                      <div className="like"></div>
                                    </button>
                                  )}
                              </td>
                              <td>{i.date1}</td>
                              <td>{i.date2}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                }
              </div>
              <div className="cabinet__bottom">
                <button onClick={(e) => setMyOrder(e)} className="my-btn">
                  Bestellung erstellen
                </button>

                <button onClick={setLogout} className="my-btn">
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
export default Dashboard;
