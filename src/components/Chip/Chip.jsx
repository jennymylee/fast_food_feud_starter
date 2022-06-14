import * as React from "react";
import "./Chip.css";

export function Chip({ label = "", isActive = false, onClick = () => {} }) {
  let buttonClassName = isActive ? "chip active" : "chip";
  return (
    <button className={buttonClassName} onClick={onClick}>
      <p className="label">{label}</p>
      <span
        className="close"
        role="button"
        onClick={() => {
          document
            .getElementsByClassName(buttonClassName)[0]
            .classList.add("close");
          document
            .getElementsByClassName(buttonClassName)[0]
            .classList.remove("active");
        }}
      >{`X`}</span>
    </button>
  );
}

export default Chip;
