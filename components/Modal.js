import React, { useContext } from "react";
import { DataContext } from "../store/globalstate";
import styles from "../styles/Modal.module.css";
const Modal = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const modal = state?.modal;

  return (
    <>
      {modal.add && renderBody(props, dispatch)}
      {modal.update && renderBody(props, dispatch)}
    </>
  );
};
function renderBody(props, dispatch) {
  const handleClose = () => {
    dispatch({ type: "MODAL", payload: { add: false } });
  };
  const inputStyles = {
    display: "flex",
    margin: "20px",
  };
  const containerSize = {
    width: props.width,
    height: props.height,
  };
  return (
    <div className={styles.modal__container}>
      <div className={styles.modal_add_contaner} style={containerSize}>
        <button
          className={styles.btn_close}
          onClick={() => {
            handleClose();
          }}
        >
          X
        </button>
        <div
          style={{
            borderBottom: "1px solid red",
            padding: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            color: props.color || "black",
          }}
        >
          {props.title ?? "Title Here"}
        </div>
        <div style={inputStyles}>{props.children}</div>
      </div>
    </div>
  );
}
export default Modal;
