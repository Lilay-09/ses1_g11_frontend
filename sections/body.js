import React from "react";
import styles from "../styles/Body.module.css";
import { useRouter } from "next/router";
const Body = (props) => {
  const router = useRouter();
  return (
    <div className={styles.body_container}>
      {router.pathname !== "/login" && (
        <div>
          <div className={styles.header_bar}>
            {props.title ? props.title : "Title"}
          </div>
          <div>{props.children}</div>
        </div>
      )}
    </div>
  );
};

export default Body;
