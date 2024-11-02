import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PopupAdmin } from "../components/PopupAdmin/PopupAdmin";
import Footer from "../components/Footer/Footer";
import Calc from "../components/Calc/Calc";
import Card from "../components/Card";
import avatar from "../images/svg/avatar.svg";
import { getFeedbacks } from "../http/orderAPI";
import { Context } from "../index.js";

export const Main = observer(() => {
  const [feedbacks, setFeedbakcs] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [popupFeedback, setPopupFeedback] = useState(false);
  const [countFeedback, setCountFeedback] = useState(
    document.body.clientWidth / 440
  );

  const openFeedback = (i) => {
    setCurrentFeedback(i);
    setPopupFeedback(true);
  };

  useEffect(() => {
    getFeedbacks().then((data) => setFeedbakcs(data));
    window.addEventListener("resize", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, []);

  const handleResize = (event) => {
    setCountFeedback(document.body.clientWidth / 440);
  };

  return (
    <>
      <PopupAdmin isActive={popupFeedback} setIsActive={setPopupFeedback}>
        {!!currentFeedback && (
          <div className="feedback__card modal-card">
            <div className="feedback__card-top">
              <img
                src={avatar}
                className="feedback__card-avatar"
                alt="Avatar"
              />
              <div className="feedback__card-info">
                <div className="feedback__card-name">
                  {currentFeedback.email}
                </div>
              </div>
            </div>
            <div className="feedback__card-bottom">
              <div
                className={
                  "star-wrapper small-stars st" + currentFeedback.raiting
                }
              >
                <p name="5" className="fas fa-star s1 "></p>
                <p name="4" className="fas fa-star s2"></p>
                <p name="3" className="fas fa-star s3 "></p>
                <p name="2" className="fas fa-star s4"></p>
                <p name="1" className="fas fa-star s5"></p>
              </div>
              <div className="feedback__card-text modal-text">
                {currentFeedback.name}
              </div>
            </div>
          </div>
        )}
      </PopupAdmin>

      <main className="main">
        <section className="top">
          <div className="top-sky"></div>
          <div className="bottom-sky"></div>
          <div className="container">
            <div className="top__inner">
              <div className="top__calc">
                <h3 className="title">BESTELLKOSTEN BERECHNEN</h3>
                <div className="top__order-wrapper calc-wrapper">
                  <Calc isModal={false}></Calc>
                </div>
              </div>
              <div className="top__order">
                <h3 className="title">BESTELLNUMMER ERFAHREN</h3>
                <div className="top__order-wrapper">
                  <div className="top__order-inner">
                    <div className="wrap-input">
                      <input
                        className="input-number"
                        placeholder="Nummer eingeben"
                        type="text"
                      />
                      <button className="search search-btn">
                        <div className="search-img"></div>
                      </button>
                    </div>
                    <div className="comment">
                      Die Bestellnummer finden Sie in Ihrem persönlichen Konto
                    </div>
                  </div>
                </div>
              </div>
              <button className="top__order"></button>
            </div>
          </div>
        </section>

        <section id="feedback" className="feedback">
          <div className="feedback__slider">
            <div className="row">
              <div className="container">
                <h3 className="title">FEEDBACKS</h3>
                <div className="subtitle">
                  Ihr Feedback und Ihre Dankbarkeit sind uns sehr wichtig!
                </div>
              </div>

              <Swiper
                spaceBetween={20}
                slidesPerView={countFeedback}
                loop={true}
              >
                {feedbacks.length > 0 &&
                  feedbacks.map((i, index) => (
                    <SwiperSlide key={index}>
                      <div className="feedback__card">
                        <div className="feedback__card-top">
                          <img src={avatar} className="feedback__card-avatar" />
                          <div className="feedback__card-info">
                            <div className="feedback__card-name">{i.email}</div>
                          </div>
                        </div>
                        <div className="feedback__card-bottom">
                          <div
                            className={
                              "star-wrapper small-stars st" + i.raiting
                            }
                          >
                            <p name="5" className="fas fa-star s1 "></p>
                            <p name="4" className="fas fa-star s2"></p>
                            <p name="3" className="fas fa-star s3 "></p>
                            <p name="2" className="fas fa-star s4"></p>
                            <p name="1" className="fas fa-star s5"></p>
                          </div>
                          <div
                            className={
                              i.name.length > 120
                                ? "feedback__card-text dotes"
                                : "feedback__card-text"
                            }
                          >
                            {i.name}
                          </div>
                          {i.name.length > 120 && (
                            <button
                              onClick={() => openFeedback(i)}
                              className="feedback__card-more"
                            >
                              Weiterlesen
                            </button>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="top-sky"></div>
          <div className="bottom-sky"></div>
          <div className="container">
            <div className="about__inner">
              <h3 className="title">
                VORTEILE DES UNTERNEHMENS{" "}
                <span className="green">GRUZ SERVICE</span>
              </h3>
              <div className="subtitle">
                Wir bieten täglich ein vollständiges Spektrum an
                Dienstleistungen für Geschwindigkeit, Sicherheit und Komfort an.
              </div>

              <ul className="about__cards">
                <li className="about__card">
                  <div className="subtitle about-card">
                    Vorteilhafte Bedingungen
                  </div>
                  <div className="about__text">
                    Wir verstehen die Situation der Kunden und sind bereit, bei
                    Preis und Zahlungsbedingungen entgegenzukommen. Wir bieten
                    immer viele Optionen für die Auswahl der optimalen Lösung
                    an.
                  </div>
                </li>
                <li className="about__card">
                  <div className="subtitle about-card">
                    Hilfsbereites Personal
                  </div>
                  <div className="about__text">
                    Unser Team sorgt für hohe Dienstleistungsqualität, einen
                    individuellen Ansatz für jeden Kunden und ist jederzeit
                    bereit, Fragen der Kunden zu beantworten.
                  </div>
                </li>
                <li className="about__card">
                  <div className="subtitle about-card">Bonusse</div>
                  <div className="about__text">
                    Langjährigen Partnern gewähren wir große Vorteile,
                    einschließlich eines Bonusprogramms und einer Vielzahl
                    zusätzlicher Vorteile.
                  </div>
                </li>
                <li className="about__card">
                  <div className="subtitle about-card">Erfahrene Fahrer</div>
                  <div className="about__text">
                    Nur professionelle Fahrer mit über 10 Jahren Erfahrung
                    arbeiten bei uns. Sehen Sie sich die Fotos und
                    Video-Feedbacks über das Unternehmen und unsere Mitarbeiter
                    an.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="card" className="my-card">
          <div className="container">
            <div className="my-card__inner">
              <h3 className="title">WIE MAN UNS FINDEN KANN</h3>
              <div className="subtitle">
                Wir befinden uns an folgender Adresse:{" "}
                <span className="green">Hannover</span>
              </div>
            </div>
          </div>
          <Card></Card>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
});

export default Main;
