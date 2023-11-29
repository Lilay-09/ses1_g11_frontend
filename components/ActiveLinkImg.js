import React, { useState } from "react";
import ActiveLink from "./ActiveLink";
import ImageComp from "./ImageComp";
import styles from "../styles/sidebar.module.css";

const ActiveLinkImg = (props) => {
  const img = props.img;
  const href = props.href;
  const className = props.className;
  const dropdown = props.dropdown;
  const [isDropdown, setDropdown] = useState(true);
  const handleDropdownClick = () => {
    setDropdown(!isDropdown);
  };
  return (
    <div style={{ width: "100%" }}>
      {href ? (
        <ActiveLink
          href={`${href ? href : "/"}`}
          className={"active__lnk_wt_img"}
        >
          <div className={styles ? styles.sb__mnu_icon : className}>
            {/* <ImageComp imageUrl={`${img ? img : "/"}`} /> */}
          </div>
          <p style={{ textTransform: "capitalize" }}>{props.name}</p>
        </ActiveLink>
      ) : (
        <div
          className={"active__lnk_wt_img"}
          onClick={dropdown ? handleDropdownClick : null}
          style={{ backgroundColor: !isDropdown && "red" }}
        >
          <div className={styles ? styles.sb__mnu_icon : className}>
            {/* <ImageComp imageUrl={`${img ? img : "/"}`} /> */}
          </div>
          <p style={{ textTransform: "capitalize" }}>{props.name}</p>
        </div>
      )}
      {dropdown ? (
        <div
          className={
            isDropdown
              ? styles.dropdown_mnu
              : styles.dropdown_mnu + " " + styles["active"]
          }
        >
          <div className={styles._dd_container__children}>{props.children}</div>
        </div>
      ) : null}
    </div>
  );
};

export default ActiveLinkImg;

// import React, { useState } from "react";
// import PropTypes from "prop-types";

// const Dropdown = ({ trigger, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="dropdown">
//       <div className="dropdown-trigger" onClick={toggleDropdown}>
//         {trigger}
//       </div>
//       {isOpen && (
//         <div className="dropdown-menu">
//           {React.Children.map(children, (child) =>
//             React.cloneElement(child, { onClose: toggleDropdown })
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// Dropdown.propTypes = {
//   trigger: PropTypes.node.isRequired,
//   children: PropTypes.node.isRequired,
// };

// export default Dropdown;

// import React, { useState } from "react";
// import ActiveLink from "./ActiveLink";
// import ImageComp from "./ImageComp";
// import styles from "../styles/sidebar.module.css";

// const ActiveLinkImg = (props) => {
//   const img = props.img;
//   const href = props.href;
//   const className = props.className;
//   const dropdown = props.dropdown;
//   const [isDropdown, setDropdown] = useState(false);
//   const handleDropdownClick = () => {
//     setDropdown(!isDropdown);
//   };
//   return (
//     <div style={{ width: "100%" }}>
//       {href ? (
//         <ActiveLink
//           href={`${href ? href : "/"}`}
//           className={"active__lnk_wt_img"}
//         >
//           <div className={styles ? styles.sb__mnu_icon : className}>
//             {/* <ImageComp imageUrl={`${img ? img : "/"}`} /> */}
//           </div>
//           <p style={{ textTransform: "capitalize" }}>{props.name}</p>
//         </ActiveLink>
//       ) : (
//         <div
//           className={"active__lnk_wt_img"}
//           onClick={dropdown ? handleDropdownClick : null}
//         >
//           <div className={styles ? styles.sb__mnu_icon : className}>
//             {/* <ImageComp imageUrl={`${img ? img : "/"}`} /> */}
//           </div>
//           <p style={{ textTransform: "capitalize" }}>{props.name}</p>
//         </div>
//       )}
//       {dropdown ? (
//         <div
//           className={
//             isDropdown
//               ? styles.dropdown_mnu
//               : styles.dropdown_mnu + " " + styles["active"]
//           }
//           style={{ color: "black" }}
//         >
//           <div className={styles._dd_container__children}>{props.children}</div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default ActiveLinkImg;
