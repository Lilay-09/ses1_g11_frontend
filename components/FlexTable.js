// Table.js

import React from "react";

const FlexTable = ({ data, excludedKeys, p_key }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const defaultHeader = Object.keys(data[0]).filter(
    (key) => !excludedKeys?.includes(key)
  );
  const headers = defaultHeader;
  const handleGetValueById = (rowId) => {
    const clickedRow = data.find((row) => row.id === rowId); // Assuming 'id' is the identifier in the row
    if (clickedRow) {
      const specificValue = clickedRow["specificKey"]; // Replace 'specificKey' with the key you want to retrieve
      setClickedValue(specificValue);
    }
  };
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <>
                <td key={header}>{row[header]}</td>
                <td>
                  <button onClick={() => handleGetValueById(row.id)}>
                    Get Value
                  </button>
                </td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlexTable;
