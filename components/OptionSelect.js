import React from "react";

const OptionSelect = ({
  data,
  value,
  target,
  onChange,
  show_key,
  unique_name,
}) => {
  let pk = target ? target : "id";
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = data.find((option) => option[pk] == selectedValue);
    const row_values = selectedOption;
    onChange({
      id: e.target.value,
      row_values: row_values,
      unique: unique_name,
    });
  };

  return (
    <select value={value} onChange={handleChange}>
      {data.map((option, i) => (
        <option key={i} value={option[pk]}>
          {option[show_key]}
        </option>
      ))}
    </select>
  );
};

export default OptionSelect;
