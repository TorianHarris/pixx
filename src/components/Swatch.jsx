import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Swatch(props) {
  const style = {
    width: 27,
    height: '27px',
    backgroundColor: props.color,
    border: 'none',
    borderRadius: '50%',
    display: 'inline-block',
    float: 'left',
    margin: 4
  }
  return (
    <div style={style} id={props.id}>
      {/* <FontAwesomeIcon icon={faCheck}/> */}
    </div>
  );
}
