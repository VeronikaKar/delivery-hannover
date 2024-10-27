import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main.js";

export const PopupAdmin = observer(({ isActive, setIsActive, children }) => {
  const { user } = useContext(Context);

  useEffect(() => {
    console.log(isActive);
  }, [isActive]);

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscape, true);
    return () => {
      window.removeEventListener("keydown", handleEscape, true);
    };
  }, []);

  return (
    <div className={`popup-admin ${isActive ? "active" : ""}`}>
      <div className="container popup-reg-container">
        <div className="popup-reg__inner">
          <div className="popup-reg__card">
            <div
              className={`popup-admin__card-inner ${isActive ? "active" : ""}`}
            >
              <button
                onClick={() => setIsActive(false)}
                className="close-card reg-close"
                aria-label="Close popup"
              ></button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
