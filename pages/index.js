import React, { useContext } from "react";
import Body from "../sections/body";
import MainBody from "../sections/body";
import Link from "next/link";
import ActiveLink from "../components/ActiveLink";
import { DataContext } from "../store/globalstate";

const Dashboard = () => {
  const { state, dispatch } = useContext(DataContext);
  const handleTest = () => {
    window.alert("sdf");
    return dispatch({ action: "MODAL", payload: { update: "sdfrsdf" } });
  };
  return (
    <MainBody>
      <div onClick={handleTest}>Test</div>
    </MainBody>
  );
};

export default Dashboard;
