import React from "react";

export const Card = () => {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <a
        href="https://www.google.com/maps/place/Hannover/"
        style={{
          color: "#eee",
          fontSize: "12px",
          position: "absolute",
          top: "0px",
        }}
        aria-label="Link to Hannover on Google Maps"
      >
        Hannover
      </a>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96335.14451895294!2d9.652731809764716!3d52.37447790000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b052780913e73b%3A0xcba5f14fb95c94e9!2sHannover!5e0!3m2!1sen!2sde!4v1697170579865!5m2!1sen!2sde"
        width="100%"
        height="800"
        frameBorder={1}
        allowFullScreen
        style={{ position: "relative" }}
      ></iframe>
    </div>
  );
};

export default Card;
