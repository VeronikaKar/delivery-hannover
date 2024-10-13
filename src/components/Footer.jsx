import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg";
import what from "../images/what.svg";
import mail from "../images/mail.svg";
import { observer } from "mobx-react-lite";
import { AUTH_ROUTE, MAIN_ROUTE } from "../utils/const";

export const Footer = () => {
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
    const subject = encodeURIComponent("");
    const body = encodeURIComponent("");
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__inner">
          <Link to={MAIN_ROUTE} className="header__logo--link footer-link">
            <img src={logo} className="header__logo" alt="Logo" />
          </Link>
          <div className="footer__right">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                whatsapp();
              }}
              className="header__link btn-footer"
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
            >
              <img src={mail} alt="Gmail Icon" />
              umzug_service@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
