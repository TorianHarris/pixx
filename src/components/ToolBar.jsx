import React from "react";
import Swatch from "./Swatch";
import ToolButton from "./ToolButton";
import ToolTip from "./ToolTip";
import NewSwatch from "./NewSwatchButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faBorderNone,
  faPencilAlt,
  faEraser,
  faFillDrip,
  faUndoAlt,
  faRedoAlt,
  faGripLines,
  faGripLinesVertical
} from "@fortawesome/free-solid-svg-icons";


export default function ToolBar(props) {
  const { activeColor, activeMode, canvasHistory, gridState, historyIndex, swatches, } = props.state;

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
      border: "1px solid " + activeColor,
      boxShadow: "0px 0px 18px " + activeColor,
      margin: 15
    },
    swatchContainer: {
      width: 280,
      height: 120,
      overflowY: 'scroll',
      textAlign: "center"
    },
    button: {
      backgroundColor: 'white',
      height: 60,
      width: 60,
      borderRadius: "50%",
      border: "none",
      margin: 15
    }
  };

  return (
    <div style={style.backdrop}>
      <div style={style.header}>Pixx</div>
      <div style={style.row}>
        <ToolButton icon={faPencilAlt} active={activeMode === 'draw'} handleClick={() => props.handleMode('draw')} />
        <ToolButton icon={faEraser} active={activeMode === 'erase'} handleClick={() => props.handleMode('erase')} />
        <ToolButton icon={faFillDrip} active={activeMode === 'paint'} handleClick={() => props.handleMode('paint')} />
      </div>
      <div style={style.row}>
        <ToolButton icon={faUndoAlt} active={historyIndex > 0} handleClick={props.handleUndo} />
        <ToolButton icon={faRedoAlt} active={historyIndex < canvasHistory.length - 1} handleClick={props.handleRedo} />
      </div>
      <hr style={style.hr} />
      {/* grid toggle */}
      <div style={style.row}>
        <ToolButton value='paint' icon={gridState ? faBorderAll : faBorderNone} active={gridState} handleClick={props.handleGrid} />
        <ToolTip>
        <button style={style.button}>
          <span className='fa-layers fafw'>
            <FontAwesomeIcon icon={faGripLines} color='grey' size='3x' transform='left-5' />
            <FontAwesomeIcon icon={faGripLinesVertical} color='grey' size='3x' transform='left-1' />
          </span>
        </button>
        </ToolTip>
      </div>
      <hr style={style.hr} />
      <div style={style.row}>
        <div style={style.swatchContainer}>
          {swatches.map((s, index) => {
            return (
              <Swatch
                color={s}
                active={activeColor === s}
                id={index}
                handleColorChange={props.handleColorChange}
                key={"swatch-" + index} />
            );
          })}
          <NewSwatch handleNewSwatch={props.handleNewSwatch} id={'new-swatch'} />
        </div>
      </div>
    </div>
  );
}
