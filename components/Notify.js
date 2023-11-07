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
        <Toast bgColor="pink" msg={{ msg: notify.error, title: "Error" }} />
      )}

      {notify.success && (
        <Toast
          bgColor="green"
          msg={{ msg: notify.success, title: "Success" }}
          // handler={() => dispatch({ type: "NOTIFY", payload: {} })}
        />
      )}
    </>
  );
};

export default Notify;
