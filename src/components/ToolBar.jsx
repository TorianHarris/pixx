import React from 'react';
import Swatch from './Swatch';

export default function ToolBar(props) {
  const style = {
    backdrop: {
      width: 450,
      height: '100vh',
      backgroundColor: '#212121',
      color: 'white',
      boxShadow: '5px 0px 18px #0d0d0d',
    },
    header: {
      height: 50,
      width: '100%',
      backgroundColor: '#09141d',
      fontSize: 36,
      fontWeight: 900,
      textAlign: 'center',
    },
    row: {
      display: 'flex',
      justifyContent: 'center'
    },
    hr: {
      border: '1px solid ' + props.color,
      boxShadow: '0px 0px 18px ' + props.color,
      margin: 15
    }
  }

  return (
    <div style={style.backdrop}>
      <div style={style.header}>Pixx</div>
      <hr style={style.hr} />
      {/* grid toggle */}
      <div style={style.row}>
        <button onClick={props.handleGrid}>grid</button>
      </div>
      <hr style={style.hr} />
      <div style={style.row} onClick={props.handleColorChange}>
        {props.swatch.map((s, index) => {
          return <Swatch color={s} id={index} key={'swatch' + index} />
        })}
      </div>
    </div>
  );
};