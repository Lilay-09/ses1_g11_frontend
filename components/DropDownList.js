import { useEffect, useState } from "react";
import styles from "../styles/DropdownList.module.css";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        <span style={{ fontSize: "18px", fontWeight: "bolder", color: "grey" }}>
          {props.name}
        </span>
      </div>
      <div className={`${styles.dropdownContent} ${isOpen ? styles.show : ""}`}>
        {isOpen && <div className={styles.slideIn}>{props.children}</div>}
      </div>
    </div>
  );
};

export default Dropdown;
