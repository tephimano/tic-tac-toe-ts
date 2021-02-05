import { Button } from "antd";
import React from "react";

const SquareButton = ({ value, hover, onClick, onMouseOver, onMouseOut }) => {
  console.log("Hover ", hover);
  const style =
    hover === 1
      ? { width: "75px", height: "75px", border: "2px solid #fff", background: "blue" }
      : { width: "75px", height: "75px", border: "2px solid #fff" };
  return (
    <Button
      type="primary"
      size={"large"}
      style={style}
      id={value}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      {value ? value : " "}
    </Button>
  );
};

export default SquareButton;
