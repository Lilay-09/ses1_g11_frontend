import React from "react";
import Protected from "../utils/Protected";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { isUserAuthenticated } from "../utils/isUserAuthenicated";

const Layout = (props) => {
  const router = useRouter();
  return (
    <div className="layout_body">
      {router.pathname !== "/login" && <Sidebar />}
      <div className="layout_children_container">{props.children}</div>
    </div>
  );
};

export default Protected(Layout);
