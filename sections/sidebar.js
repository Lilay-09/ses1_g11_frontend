import React, { useState } from "react";
import ActiveLink from "../components/ActiveLink";
import styles from "../styles/sidebar.module.css";
import ImageComp from "../components/ImageComp";
import Button from "../components/Button";
import ActiveLinkImg from "../components/ActiveLinkImg";
import cookie from "js-cookie";
import { useRouter } from "next/router";
const Sidebar = () => {
  const router = useRouter();
  const [openSideBar, setSideBar] = useState(true);
  const handleOpenMnu = () => {
    setSideBar(!openSideBar);
  };
  const handleLogout = () => {
    cookie.remove("__auth__login__");
    router.push("/login");
  };
  return (
    <div
      className={
        openSideBar
          ? styles.sidbar_container + " " + styles["active"]
          : styles.sidbar_container
      }
    >
      <div className={styles.sb_branding_logo}>
        <div className={styles.mnu_btn_toggle} onClick={handleOpenMnu}>
          {/* <ImageComp imageUrl={"/images/arrow.png"} /> */}
        </div>
      </div>
      <div className={styles.sb_mnu_container}>
        <div className={styles.sb__mnu}>
          <div className={styles.sb_mnu_content}>
            <ActiveLinkImg name="Dashboard" href="/" />
          </div>
          <div className={styles.sb_mnu_content}>
            <ActiveLinkImg name="Pages" dropdown>
              <ActiveLink href={"/website/home"}>Home</ActiveLink>
              <ActiveLink href={"/website/shop"}>Shop</ActiveLink>
            </ActiveLinkImg>
          </div>
          <div className={styles.sb_mnu_content}>
            <ActiveLinkImg name="Warehouse" dropdown>
              <ActiveLink href={"/warehouse"}>Warehouse</ActiveLink>
              {/* <ActiveLink href={"/website/shop"}>Shop</ActiveLink> */}
            </ActiveLinkImg>
          </div>
          <div className={styles.sb_mnu_content}>
            <ActiveLinkImg name="Dashboard" href="/" />
          </div>
          <div className={styles.sb_mnu_content}>
            <ActiveLinkImg />
          </div>
        </div>
        <div className={styles.sb_mnu_btn_logout}>
          <div className={styles.sb__mnu_icon}>
            {/* <ImageComp imageUrl={""} /> */}
          </div>
          <Button
            onClick={handleLogout}
            name="Logout"
            width="100%"
            className={styles.logout_btn}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
