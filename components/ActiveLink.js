import Link from "next/link";
import { withRouter } from "next/router";
import React, { Children, use } from "react";

const ActiveLink = ({ router, href, children, className }) => {
  (function prefetchPages() {
    if (typeof window !== "undefined") {
      router.prefetch(router.pathname);
    }
  })();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };
  const isCurrentPath = router.pathname === href || router.asPath === href;
  // const inlineStyles = {
  //   position: "relative",
  // };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      style={{
        textDecoration: "none",
        margin: 0,
        // padding: "1.3rem 0rem",
        fontWeight: isCurrentPath ? "bolder" : "normal",
        color: isCurrentPath ? "black" : "grey",
        position: "relative",
        // borderBottom: isCurrentPath ? "3px solid green" : "",
      }}
    >
      {children}
    </Link>
  );
};

export default withRouter(ActiveLink);
