import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ToolButton(props) {
  const style = {
    button: state => ({
      backgroundColor: state ? "white" : "grey",
      height: 60,
      width: 60,
      borderRadius: "50%",
      border: "none",
      margin: 15
      // '&:hover': {
      //   backgroundColor: 'red',
      // }
    })
  };

  return (
    <button
      style={style.button(props.mode === props.value)}
      onClick={() => props.handleMode(props.value)}
    >
      <FontAwesomeIcon icon={props.icon} size="3x" />
    </button>
  );
}
