import React, { useState } from "react";
const Input = ({
  forLabel,
  id,
  placeholder,
  color,
  onChange,
  className,
  name,
  value,
  isPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input_container">
      <input
        className="input"
        required
        type={isPassword && !showPassword ? "password" : "text"}
        id={id}
        onChange={onChange}
        name={name}
        value={value}
      />

      <label className="label" htmlFor={id}>
        {placeholder}
        <div className="hide__label_line"></div>
      </label>
      {isPassword && (
        <div
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          style={{ position: "absolute", right: "10px", bottom: "10px" }}
        >
          T
        </div>
      )}
      <span className="line"></span>
    </div>
  );
};

export default Input;
