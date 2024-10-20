import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg";
import what from "../images/what.svg";
import mail from "../images/mail.svg";
import { observer } from "mobx-react-lite";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { AUTH_ROUTE, MAIN_ROUTE } from "../../utils/const";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export const Footer = observer(() => {
  const whatsapp = () => {
    const phoneNumber = "+49 151 5541 9632";
    const appLink = `whatsapp://send?phone=${phoneNumber}`;
    const webLink = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
    const timeout = 1500;
    const start = Date.now();

    window.location = appLink;

    setTimeout(() => {
      if (Date.now() - start < timeout + 100) {
        window.open(webLink, "_blank");
      }
    }, timeout);
  };

  const mailSend = () => {
    const recipient = "umzug_service@gmail.com";
    const subject = encodeURIComponent("Your Subject Here");
    const body = encodeURIComponent("Your message here.");
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__inner">
          <Link to={MAIN_ROUTE} className="header__logo--link footer-link">
            <img src={logo} className="header__logo" alt="Company Logo" />
          </Link>
          <div className="footer__right">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                whatsapp();
              }}
              className="header__link btn-footer"
              aria-label="Contact us on WhatsApp"
            >
              <img src={what} alt="WhatsApp Icon" />
              +49 151 5541 9632
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                mailSend();
              }}
              className="header__link btn-footer"
              aria-label="Send us an email"
            >
              <img src={mail} alt="Gmail Icon" />
              umzug_service@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="map-container" style={{ height: "300px", width: "100%" }}>
        <MapContainer
          center={[52.3759, 9.732]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[52.3759, 9.732]}>
            <Popup>
              <span>Contact Us</span>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
});

export default Footer;
