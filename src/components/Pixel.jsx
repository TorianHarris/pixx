import React from 'react';

export default function Pixel(props) {
  const style = {
    width: '25px',
    height: '25px',
    backgroundColor: props.color,
    border: '1px solid grey',
    display: 'inline-block',
    float: 'left'
  }
  return (
    <div style={style} id={props.id} />
  );
}
