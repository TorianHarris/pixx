import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function NewSwatchButton(props) {
  const style = {
    root: {
      width: 25,
      height: 25,
      backgroundColor: '#00000000',
      border: '1px solid white',
      borderRadius: '50%',
      display: 'inline-block',
      float: 'left',
      margin: 4
    },
  }
  return (
    <button style={style.root} id={props.id} onClick={() => {props.handleNewSwatch('orange')}}>
      <FontAwesomeIcon icon={faPlus} color='white' size='lg' transform="left-2"/>
    </button>
  );
}
