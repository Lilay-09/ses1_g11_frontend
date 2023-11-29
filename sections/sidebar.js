import React, { useState } from "react";
import ActiveLink from "../components/ActiveLink";
import styles from "../styles/sidebar.module.css";
import ImageComp from "../components/ImageComp";
import Button from "../components/Button";
import ActiveLinkImg from "../components/ActiveLinkImg";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Dropdown from "../components/ActiveLinkImg";
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
        <div className={styles.brand_logo}>Logo here</div>
        <div className={styles.mnu_btn_toggle} onClick={handleOpenMnu}>
          {/* <ImageComp imageUrl={"/images/arrow.png"} /> */}
          &gt;
        </div>
      </div>
      <div className={styles.sb_mnu_container}>
        <div className={styles.sb__mnu}>
          <ActiveLinkImg href="/" img="">
            Dashboard
          </ActiveLinkImg>
          <ActiveLinkImg href="/order">Order</ActiveLinkImg>
          <ActiveLinkImg name="Warehouse" dropdown>
            <ActiveLink href={"/warehouse/daily-stock"}>Country</ActiveLink>
          </ActiveLinkImg>
          <ActiveLinkImg name="Setting" dropdown>
            <ActiveLink href={"/setting/country"}>Country</ActiveLink>
            <ActiveLink href={"/setting/city"}>city</ActiveLink>
          </ActiveLinkImg>

          {/* <div className={styles.sb_mnu_content}>
            <ActiveLinkImg name="Dashboard" href="/" />
          </div>

          <div className={styles.sb_mnu_content}>
            <ActiveLinkImg name="Setting" dropdown>
              <ActiveLink href={"/setting/country"}>Country</ActiveLink>
            </ActiveLinkImg>
          </div>
          <div className={styles.sb_mnu_content}>
            <ActiveLinkImg name="Warehouse" dropdown>
              <ActiveLink href={"warehouse/daily-stock"}>Warehouse</ActiveLink>
            </ActiveLinkImg>
          </div>
          <div className={styles.sb_mnu_content}>
            <ActiveLinkImg name="Dashboard" href="/" />
          </div>
          <div className={styles.sb_mnu_content}>
            <ActiveLinkImg />
          </div> */}
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
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
