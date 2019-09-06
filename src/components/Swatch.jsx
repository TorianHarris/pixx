import React from 'react';

export default function Swatch(props) {
  const style = {
    width: '20px',
    height: '20px',
    backgroundColor: props.color,
    border: '1px solid white',
    display: 'inline-block',
    float: 'left'
  }
  return (
    <div style={style} id={props.id} />
  );
}
