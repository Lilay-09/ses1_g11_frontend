import React, { useState } from "react";
import styles from "../styles/DropdownList.module.css";
const DropDownList = ({ children, data }) => {
  const [initialTitle, setInitialTitle] = useState();
  const handleSeletectedValue = (e, id) => {
    const selectedValue = e.target.textContent;
    setInitialTitle(selectedValue);
  };
  return (
    <div className={styles.dropdown_container}>
      <h5 className={styles.selected_initial}>{initialTitle}</h5>

      {/* <div onClick={(e) => handleSeletectedValue(e, "1")}>sdf1</div>
      <div onClick={handleSeletectedValue}>sdf</div>
      <div>sdf</div> */}
    </div>
  );
};

export default DropDownList;
