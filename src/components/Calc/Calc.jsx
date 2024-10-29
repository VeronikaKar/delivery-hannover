import { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Context } from "../../main.js";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { createOrder } from "../../http/orderAPI";

export const Calc = ({ isModal, setOrders, setPopupAdmin }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [distance, setDistance] = useState("");
  const [calc, setCalc] = useState(false);
  const [load, setLoad] = useState(false);
  const [day, setDay] = useState(1);
  const [price, setPrice] = useState("500");
  const [myForm, setMyForm] = useState({
    city1: "",
    city2: "",
    weight: "",
    size: "",
  });

  const cityData = {
    Berlin: { lat: 52.52, lon: 13.405 },
    Munich: { lat: 48.1351, lon: 11.582 },
    Hamburg: { lat: 53.5511, lon: 9.9937 },
    Frankfurt: { lat: 50.1109, lon: 8.6821 },
    Hannover: { lat: 52.3759, lon: 9.732 },
  };

  const haversineDistance = (city1, city2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const lat1 = cityData[city1].lat;
    const lon1 = cityData[city1].lon;
    const lat2 = cityData[city2].lat;
    const lon2 = cityData[city2].lon;

    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2); // Return distance in km
  };

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
    setCalc(false); // Reset calc state
    setDistance(""); // Reset distance display
  };

  useEffect(() => {
    const cityNames = Object.keys(cityData);
    setCities(cityNames);
  }, []);

  const calculateOrder = (e) => {
    e.preventDefault();
    if (myForm.city1 && myForm.city2) {
      setLoad(true);
      const dist = haversineDistance(myForm.city1, myForm.city2);
      setDistance(`${dist} km`);
      setCalc(true);
      setLoad(false);
    } else {
      alert("Bitte wählen Sie eine Stadt");
    }
  };

  return (
    <>
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
              <option key={index} value={city}>
                {city}
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
              <option key={index} value={city}>
                {city}
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
          Entfernung: <span className="bold">{distance}</span>, ab{" "}
          <span className="bold">{price} €</span>, voraussichtliche Lieferzeit:{" "}
          <span className="bold">{day}</span> Tag(e)
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
                  onClick={() => navigate(user.path)}
                  className="my-btn"
                >
                  Zur Bestellung
                </button>
              )}
        </div>
      </form>

      {/* Map Container */}
      {calc && (
        <MapContainer
          center={[52.3759, 9.732]} // Center map on Hannover
          zoom={6}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {myForm.city1 && (
            <Marker position={cityData[myForm.city1]}>
              <Popup>{myForm.city1}</Popup>
            </Marker>
          )}
          {myForm.city2 && (
            <Marker position={cityData[myForm.city2]}>
              <Popup>{myForm.city2}</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </>
  );
};

export default Calc;
