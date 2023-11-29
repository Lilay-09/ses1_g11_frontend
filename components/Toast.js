import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Login.module.css";
import { DataContext } from "../store/globalstate";
const Toast = ({
  msg,
  bgColor,
  handler,
  title,
  titleSize,
  titleColor,
  bodyMsgFS,
  bodyMsgColor,
}) => {
  const { state, dispatch } = useContext(DataContext);
  const [isNotify, setNotify] = useState(state);
  const [loading, setLoading] = useState(false);
  const [coolDown, setCoolDown] = useState(5);
  const [canClick, setCanClick] = useState(true);
  useEffect(() => {
    if (isNotify && canClick) {
      // Trigger NOTIFY action after 5 seconds
      const notifyTimer = setTimeout(() => {
        dispatch({ type: "NOTIFY", payload: {} });
        setCanClick(true);
      }, 5000);

      setLoading(true);

      const coolDownTimer = setInterval(() => {
        if (coolDown > 0) {
          setCoolDown(coolDown - 1);
        } else {
          setLoading(false);
          dispatch({ type: "NOTIFY", payload: {} });
          clearInterval(coolDownTimer);
        }
      }, 1000);

      return () => {
        clearTimeout(notifyTimer);
        clearInterval(coolDownTimer);
        setLoading(false);
        setCanClick(true);
      };
    }

    // console.log(state.notify);
  }, [dispatch, state, coolDown, isNotify, canClick]);

  const toastStyle = {
    backgroundColor: `${bgColor}`,
    width: "20vw",
    height: "12vw",
    minWidth: "250px",
    position: "absolute",
    minHeight: "150px",
    top: "1rem",
    right: "0rem",
    zIndex: 1000,
    overFlow: "hidden",
    borderRadius: "15px",
    boxShadow: "0px 1px 7px 3px rgba(0, 0, 0, 0.18)",
  };
  const titleStyle = {
    fontSize: `${titleSize}`,
    color: `${titleColor}`,
    fontWeight: "bold",
    height: "50%",
  };
  const bodyMSG = {
    fontSize: `${bodyMsgFS}`,
    color: `${bodyMsgColor}`,
    padding: "0 1rem",
    display: "flex",
    // alignItems: "center",
    height: "50%",
    // backgroundColor: "red",
    borderRadius: "15px",
    justifyContent: "center",
  };

  const progress = (coolDown / 5) * 100;

  return isNotify ? (
    <div>
      <div style={toastStyle}>
        <div
          style={{
            height: "50%",
            display: "flex",
            alignItems: "center",
            padding: "0rem 1rem",
            justifyContent: "center",
          }}
        >
          <span style={titleStyle}>{msg.title}</span>
          <button
            style={{
              border: "none",
              position: "absolute",
              right: "1rem",
              top: "1rem",
              padding: "0.2rem 0.5rem",
              fontSize: "0.8rem",
            }}
            onClick={() => {
              dispatch({ type: "NOTIFY", payload: {} });
              setCanClick(false);
            }}
          >
            X
          </button>
        </div>
        <div style={bodyMSG}>
          <span>{msg.msg}</span>
        </div>
        {/* <div className={`progressbar ${coolDown < 3 ? "low-cooldown" : ""}`}>
          <div style={{ width: `${progress}%` }}></div>
        </div> */}
      </div>
    </div>
  ) : null;
};

export default Toast;
