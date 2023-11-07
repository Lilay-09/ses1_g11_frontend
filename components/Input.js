import React from "react";
const Input = ({
  forLabel,
  id,
  placeholder,
  color,
  onChange,
  className,
  name,
}) => {
  return (
    <div className="input_container">
      <input
        className="input"
        required
        type="text"
        id={id}
        onChange={onChange}
        name={name}
      />
      <label className="label" htmlFor={id}>
        {placeholder}
        <div className="hide__label_line"></div>
      </label>
      <span className="line"></span>
    </div>
  );
};

export default Input;
