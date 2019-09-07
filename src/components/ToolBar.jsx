import React from "react";
import Swatch from "./Swatch";
import ToolButton from "./ToolButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faBorderNone,
  faPencilAlt,
  faEraser,
  faFillDrip,
  faUndoAlt,
  faRedoAlt
} from "@fortawesome/free-solid-svg-icons";

export default function ToolBar(props) {
  const style = {
    backdrop: {
      width: 450,
      height: "100vh",
      backgroundColor: "#212121",
      color: "white",
      boxShadow: "5px 0px 18px #0d0d0d"
    },
    header: {
      height: 50,
      width: "100%",
      backgroundColor: "#09141d",
      fontSize: 36,
      fontWeight: 900,
      textAlign: "center",
      marginBottom: 15
    },
    row: {
      display: "flex",
      justifyContent: "center"
    },
    hr: {
      border: "1px solid " + props.color,
      boxShadow: "0px 0px 18px " + props.color,
      margin: 15
    },
    swatchContainer: {
      width: 220,
      textAlign: "center"
    },
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
    <div style={style.backdrop}>
      <div style={style.header}>Pixx</div>
      <div style={style.row}>
        <ToolButton icon={faPencilAlt} active={props.mode === 'draw'} handleClick={() => props.handleMode('draw')}/>
        <ToolButton icon={faEraser} active={props.mode === 'erase'} handleClick={() => props.handleMode('erase')}/>
        <ToolButton icon={faFillDrip} active={props.mode === 'paint'} handleClick={() => props.handleMode('paint')}/>
      </div>
      <div style={style.row}>
        <ToolButton icon={faUndoAlt} active/>
        <ToolButton icon={faRedoAlt} active/>
      </div>
      <hr style={style.hr} />
      {/* grid toggle */}
      <div style={style.row}>
        <ToolButton value='paint' icon={props.gridState ? faBorderAll : faBorderNone} active={props.gridState} handleClick={props.handleGrid}/>
      </div>
      <hr style={style.hr} />
      <div style={style.row} onClick={props.handleColorChange}>
        <div style={style.swatchContainer}>
          {props.swatch.map((s, index) => {
            return <Swatch color={s} id={index} key={"swatch" + index} />;
          })}
        </div>
      </div>
    </div>
  );
}
