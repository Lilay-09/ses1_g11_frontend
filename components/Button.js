import React from "react";

const Button = (props) => {
  const buttonStyle = {
    width: `${props.width} || auto`,
    padding: `10px 12px`,
  };
  return (
    <button
      style={buttonStyle}
      className={`button ${props?.className}`}
      onClick={props.onClick}
      name={props.name}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </button>
  );
};

export default Button;
