import React, { useState } from "react";
import ActiveLink from "../components/ActiveLink";
import styles from "../styles/sidebar.module.css";
import ImageComp from "../components/ImageComp";
import Button from "../components/Button";
import ActiveLinkImg from "../components/ActiveLinkImg";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import ExpandableList from "../components/ExpandList";
import Dropdown from "../components/DropDownList";
import Link from "next/link";
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
          <ActiveLinkImg href="/">Dashboard</ActiveLinkImg>
          <ActiveLinkImg name="Product" dropdown>
            <ActiveLink href={"/product"}>Add Product</ActiveLink>
          </ActiveLinkImg>
          <ActiveLinkImg name="Purchase Order" dropdown>
            <ActiveLink href={"/purchase-order"}>Purchase</ActiveLink>
          </ActiveLinkImg>
          <ActiveLinkImg name="Setting" dropdown>
            <ActiveLink href={"/setting/country"}>Country</ActiveLink>
            <ActiveLink href={"/setting/city"}>City</ActiveLink>
            <ActiveLink href={"/setting/district"}>District</ActiveLink>
            <ActiveLink href={"/setting/brand"}>Brand</ActiveLink>
            <ActiveLink href={"/setting/category"}>Category</ActiveLink>
            <ActiveLink href={"/setting/group"}>Group</ActiveLink>
          </ActiveLinkImg>
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
