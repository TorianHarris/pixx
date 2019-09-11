import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Swatch(props) {
  const style = {
    root: {
      width: 27,
      height: '27px',
      backgroundColor: props.color,
      border: 'none',
      borderRadius: '50%',
      display: 'inline-block',
      float: 'left',
      margin: 4
    },
    icon: {
      filter: 'drop-shadow(0 0 1px #000)',
    }

  }
  return (
    <button style={style.root} id={props.id} onClick={props.handleColorChange}>
      {props.active ? <FontAwesomeIcon style={style.icon} id='active-icon' icon={faCheck} color='white' size='lg'/> : null}
    </button>
  );
}
