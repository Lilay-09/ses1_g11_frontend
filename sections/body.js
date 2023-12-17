import React from "react";
import styles from "../styles/Body.module.css";
import { useRouter } from "next/router";
import Input from "../components/Input";
const MainBody = (props) => {
  const router = useRouter();
  return (
    <div className={styles.body_container}>
      {router.pathname !== "/login" && (
        <div>
          <div className={styles.header_bar}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                // height: "45%",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3>{props.title ? props.title : "Title"}</h3>
              </div>
              <div className={styles.body_header_atv}>
                <div className={styles.search_box}>
                  <Input />
                </div>
                <div className={styles.notif_container}>
                  <div className={styles.notif_num}>5</div>
                  <div>notif</div>
                </div>
                <div className={styles.photo_avt}></div>
                <div className={styles.user__info}>Admin</div>
              </div>
            </div>
          </div>
          <div className={styles.children__props}>{props.children}</div>
        </div>
      )}
    </div>
  );
};

export default MainBody;
