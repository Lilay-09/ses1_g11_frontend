import React from "react";

const Button = (props) => {
  const buttonStyle = {
    width: `${props.width}`,
    padding: `10px 12px`,
  };
  return (
    <button
      style={buttonStyle}
      className={`button ${props.className}`}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default Button;
