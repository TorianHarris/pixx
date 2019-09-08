import React from 'react';

export default function Swatch(props) {
  const style = {
    width: '27px',
    height: '27px',
    backgroundColor: props.color,
    border: 'none',
    borderRadius: '50%',
    display: 'inline-block',
    float: 'left',
    margin: 4
  }
  return (
    <div style={style} id={props.id} />
  );
}
