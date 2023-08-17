/** @format */

import React from "react";
const Button = ({ props }) => {
  const buttonStyle = {
    color: "#ffffff",
    fontWeight: "bold",
    display: "block",
    marginBottom: "10px",
    width: props.size || "100%",
    border: "1px solid #ccc",
    borderRadius: "30px",
    backgroundColor: props.color || "#0c8b7b",
    padding: "14px 28px",
    fontSize: props.fontsize || "16px",
    cursor: "pointer",
    textAlign: "center",
  };
  return (
    <div>
      <button style={buttonStyle}>{props.name}</button>
    </div>
  );
};

export default Button;
