import React, { useContext, useState } from "react";
import Toast from "./Toast";
import { DataContext } from "../store/globalstate";

const Notify = () => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  const [stateTest, setStateTest] = useState(false);
  return (
    <>
      {notify.error && (
        <Toast
          bgColor="#BB3D11"
          titleColor={"white"}
          bodyMsgColor={"white"}
          msg={{ msg: notify.error, title: "Error" }}
        />
      )}

      {notify.success && (
        <Toast
          bgColor="#DB860A"
          msg={{ msg: notify.success, title: "Success" }}
          // handler={() => dispatch({ type: "NOTIFY", payload: {} })}
        />
      )}
    </>
  );
};

export default Notify;
