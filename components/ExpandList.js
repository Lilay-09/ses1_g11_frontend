import { useState } from "react";
import styles from "../styles/sidebar.module.css";

const ExpandableList = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <div className={styles.expandableList}>
      <button onClick={toggleExpansion}>
        {expanded ? "Collapse" : "Expand"}
      </button>
      <div
        className={`${styles.listContainer} ${expanded ? styles.expanded : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ExpandableList;
