import React from "react";

const TableAction = (id, dispatch, callback) => {
  const handleEdit = (id) => {
    dispatch;
  };
  return (
    <div
      style={{
        width: "100px",
        backgroundColor: "red",
        position: "absolute",
      }}
    >
      <div
        onClick={() => {
          handleEdit(id);
        }}
      >
        Edit
      </div>
      <div onClick={callback}>Delete</div>
    </div>
  );
};

export default TableAction;
