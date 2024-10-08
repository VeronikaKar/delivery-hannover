import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";

export const Calc = ({ isModal, setOrders, setPopupAdmin }) => {
  const { user } = useContext(Context);
  const history = useNavigate();
  const [myMap, setMyMap] = useState({});
  const [cities, setCities] = useState([]);
  const [distance, setDistance] = useState("");
  const [calc, setCalc] = useState(null);
  const [load, setLoad] = useState(false);
  const [day, setDay] = useState(1);
  const [price, setPrice] = useState("500");
  const [myForm, setMyForm] = useState({
    city1: "",
    city2: "",
    weight: "",
    size: "",
  });

  const completeOrder = (e) => {
    e.preventDefault();
    const today = new Date();
    const futureDay = today.getDate() + day;
    const startDate = new Date(today);
    const endDate = new Date();
    endDate.setDate(futureDay);

    const userToken = JSON.parse(localStorage.getItem("user"));
    createOrder({
      userId: userToken.token.id,
      city1: myForm.city1,
      city2: myForm.city2,
      weight: myForm.weight,
      size: myForm.size,
      price: price,
      date1: startDate.toLocaleDateString("de-DE"),
      date2: endDate.toLocaleDateString("de-DE"),
      email: userToken.token.email,
    }).then((data) => {
      setOrders((current) => [...current, data]);
      setPopupAdmin(false);
      resetForm();
    });
  };

  const resetForm = () => {
    setPrice("500");
    setDay(1);
    setMyForm({
      city1: "",
      city2: "",
      weight: "",
      size: "",
    });
  };

  useEffect(() => {
    getCities().then((data) => setCities(data));
    window.ymaps.ready(() => {
      setMyMap(
        new window.ymaps.Map(
          "map",
          {
            center: [55.751574, 37.573856],
            zoom: 9,
          },
          {
            searchControlProvider: "google#search",
          }
        )
      );
    });
  }, []);

  const getDistance = (city1, city2) => {
    const multiRoute = new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [city1, city2],
        params: {
          results: 1,
        },
      },
      {
        boundsAutoApply: true,
      }
    );

    myMap.geoObjects.add(multiRoute);

    multiRoute.model.events.add("requestsuccess", function () {
      const dist = multiRoute
        .getRoutes()
        .get(0)
        .properties.get("distance").text;
      setDistance(dist);
      setCalc(!calc);
      multiRoute.destroy();
    });
  };

  const calculateOrder = (e) => {
    e.preventDefault();
    if (myForm.city1.length > 0 && myForm.city2.length > 0) {
      setLoad(true);
      window.ymaps.ready(() => getDistance(myForm.city1, myForm.city2));
    } else {
      alert("Bitte wählen Sie eine Stadt");
    }
  };

  return (
    <>
      <div id="map" className="map"></div>
      <form onSubmit={calculateOrder} className="top__order-inner calc-inner">
        <div className="select">
          <select
            required
            value={myForm.city1}
            name="city1"
            onChange={(e) => setMyForm({ ...myForm, city1: e.target.value })}
          >
            <option value="" hidden>
              Von
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="select">
          <select
            required
            value={myForm.city2}
            name="city2"
            onChange={(e) => setMyForm({ ...myForm, city2: e.target.value })}
          >
            <option value="" hidden>
              Nach
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="number"
          min="0"
          max="20000"
          required
          value={myForm.weight}
          name="weight"
          onChange={(e) => setMyForm({ ...myForm, weight: e.target.value })}
          placeholder="Gewicht (kg)"
          className="input-calc"
        />
        <input
          type="number"
          min="0"
          max="90"
          required
          value={myForm.size}
          name="size"
          onChange={(e) => setMyForm({ ...myForm, size: e.target.value })}
          placeholder="Volumen (m³)"
          className="input-calc"
        />
        <div className="comment">
          ab <span className="bold">{price} €</span>, voraussichtliche
          Lieferzeit: <span className="bold">{day}</span> Tag(e)
        </div>
        <div className="calc-inner__bottom">
          <button type="submit" className="my-btn count-btn">
            {load ? <Loader /> : "Berechnen"}
          </button>
          {isModal
            ? calc && (
                <button
                  type="button"
                  onClick={completeOrder}
                  className="my-btn"
                >
                  Bestellung erstellen
                </button>
              )
            : calc && (
                <button
                  type="button"
                  onClick={() => history(user.path)}
                  className="my-btn"
                >
                  Zur Bestellung
                </button>
              )}
        </div>
      </form>
    </>
  );
};

export default Calc;
