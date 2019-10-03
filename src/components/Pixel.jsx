import React from 'react';

export default function Pixel(props) {
  const style = {
    width: props.grid ? '25px' : '27px',
    height: props.grid ? '25px' : '27px',
    backgroundColor: props.color,
    border: props.grid ? '1px solid grey' : 'none',
    display: 'inline-block',
    float: 'left',
    userDrag: 'none',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    MsUserSelect: 'none',
  }
  return (
    <div style={style} id={props.id} />
  );
}
