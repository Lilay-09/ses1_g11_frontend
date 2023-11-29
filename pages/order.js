import React from "react";
import Body from "../sections/body";
import { fetchData } from "../utils/fetchData";

const OrderScreen = () => {
  return (
    <Body>
      <div></div>
    </Body>
  );
};

export default OrderScreen;
export const getServerSideProps = async (ctx) => {
  return { props: {} };
};
