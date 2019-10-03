import React, { Component } from "react";

import Pixel from "./components/Pixel";
import ToolBar from "./components/ToolBar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      activeColor: "black",
      activeMode: "draw",
      paintHelper: {
        num: 0,
        canvas: []
      },
      gridState: true,
      currentCanvas: [],
      canvasHistory: [],
      lastCanvas: null,
      historyIndex: 0,
      swatches: [
        "#ff2104",
        "#fc005a",
        "#ab00b5",
        "#7212bd",
        "#008ffb",
        "#00a6fb",
        "#00bed9",
        "#009a8a",
        "#77cb35",
        "#c6e300",
        "#fff100",
        "#ffc400",
        "white",
        "gray",
        "black"
      ]
    };

    this.handleClick = event => {
      if (event.target.id !== "") {
        const oldCanvas = JSON.parse(JSON.stringify(this.state.currentCanvas));
        const newCanvas = JSON.parse(JSON.stringify(this.state.currentCanvas));
        switch (this.state.activeMode) {
          case "draw":
            newCanvas[event.target.id].color = this.state.activeColor;
            break;
          case "erase":
            newCanvas[event.target.id].color = "white";
            break;
          case "paint":
            //return alert("paint not ready yet");
            return this.handlePaint(null, event.target.id, newCanvas[event.target.id].color, this.state.activeColor);
          default:
            return alert("hmmm...");
        }
        this.setState(
          { lastCanvas: oldCanvas, currentCanvas: newCanvas },
          () => {
            this.addHistory();
          }
        );
      }
    };

    this.handleHover = event => {
      if (event.buttons === 1 && event.target.id !== "") {
        const newCanvas = this.state.currentCanvas;
        switch (this.state.activeMode) {
          case "draw":
            newCanvas[event.target.id].color = this.state.activeColor;
            break;
          case "erase":
            newCanvas[event.target.id].color = "white";
            break;
          default:
            break;
        }
        this.setState({ currentCanvas: newCanvas });
      }
    };

    this.addHistory = () => {
      if (this.state.lastCanvas !== this.state.currentCanvas) {
        const arr = this.state.canvasHistory.slice(0, this.state.historyIndex + 1);
        if (arr.length === 20) arr.shift();
        arr.push(this.state.currentCanvas);
        this.setState({ canvasHistory: arr, historyIndex: arr.length - 1 });
      }
    };

    this.handleUndo = () => {
      if (this.state.historyIndex > 0) {
        this.setState({
          currentCanvas: this.state.canvasHistory[this.state.historyIndex - 1],
          historyIndex: this.state.historyIndex - 1
        });
      }
    };

    this.handleRedo = () => {
      if (this.state.historyIndex < this.state.canvasHistory.length - 1) {
        this.setState({
          currentCanvas: this.state.canvasHistory[this.state.historyIndex + 1],
          historyIndex: this.state.historyIndex + 1
        });
      }
    };

    this.handleColorChange = event => {
      if (event.currentTarget.id !== '' && event.currentTarget.id !== 'new-swatch') {
        this.setState({
          activeColor: this.state.swatches[event.currentTarget.id],
          activeMode: this.state.activeMode === 'erase' ? 'draw' : this.state.activeMode
        });
      }
    };
    this.handleNewSwatch = color => {
      const newSwatches = this.state.swatches;
      newSwatches.push(color);
      this.setState({ swatches: newSwatches });
    }

    this.handleGrid = () => {
      this.setState({ gridState: !this.state.gridState });
    };

    this.handleMode = mode => {
      this.setState({ activeMode: mode });
    };

    this.handlePaint = (
      prevDirection,
      startPixel,
      colorToCheck,
      activeColor
    ) => {
      const newCanvas = JSON.parse(JSON.stringify(this.state.currentCanvas));
      //const toChange = [];
      newCanvas[startPixel].color = activeColor;
      // top check
      if (newCanvas[startPixel - 20] && newCanvas[startPixel - 20].color === colorToCheck)
      //if(this.paintCheck('up', newCanvas[startPixel], newCanvas[startPixel - 20], colorToCheck))
        newCanvas[startPixel - 20].color = activeColor;
      // bottom check
      if (newCanvas[parseInt(startPixel) + 20] && newCanvas[parseInt(startPixel) + 20].color === colorToCheck)
        newCanvas[parseInt(startPixel) + 20].color = activeColor;
      // left check TODO
      if (newCanvas[startPixel - 1] && newCanvas[startPixel - 1].color === colorToCheck
        && newCanvas[startPixel].row === newCanvas[startPixel - 1].row)
        newCanvas[startPixel - 1].color = activeColor;
      // right check TODO
      if (newCanvas[parseInt(startPixel) + 1] && newCanvas[parseInt(startPixel) + 1].color === colorToCheck
        && newCanvas[startPixel].row === newCanvas[parseInt(startPixel) + 1].row)
        newCanvas[parseInt(startPixel) + 1].color = activeColor;

      this.setState({ currentCanvas: newCanvas })
      // canvas[event.target.id].color = this.state.activeColor;
      // this.setState({ currentCanvas: })
      //set colorToCheck to be the color of the clicked pixel
      //paint clicked pixel the active color
      //check if up, left, down, and right pixels have the same color as colorToCheck
    };

    this.paintCheck = (direction, startPixel, newPixel, colorToCheck) => {
      // let modifier = 0;
      // switch (direction) {
      //   case 'up':
      //     modifier = -20;
      //     break;
      //   case 'down':
      //     modifier = 20;
      //     break;
      //   case 'left':
      //     modifier = -1;
      //     break;
      //   case 'right':
      //     modifier = 1;
      //     break;
      //   default:
      //     break;
      // }

      if(direction === 'up' || direction || 'down') {
        //return check stuff
        return (newPixel && newPixel.color === colorToCheck);
      }
      // else check left and right
      
    };
  }

  componentDidMount() {
    const pixels = Array.from({ length: 400 }, (value, index) => ({ color: "white", row: Math.floor(index / 20) + 1 }));
    const arr = [];
    arr.push(Array.from({ length: 400 }, (value, index) => ({ color: "white", row: Math.floor(index / 20) + 1 })));
    this.setState({ currentCanvas: pixels, canvasHistory: arr });
  }

  render() {
    const style = {
      workspace: {
        display: "flex"
      },
      container: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      canvas: {
        minWidth: 540,
        width: 540,
        height: 540
      }
    };

    return (
      <div>
        <div></div>
        <div style={style.workspace}>
          <ToolBar
            state={this.state}
            handleColorChange={this.handleColorChange}
            handleNewSwatch={this.handleNewSwatch}
            handleGrid={this.handleGrid}
            handleUndo={this.handleUndo}
            handleRedo={this.handleRedo}
            handleMode={this.handleMode}
          />
          <div style={style.container}>
            <div
              style={style.canvas}
              onMouseDown={this.handleClick}
              onMouseOver={this.handleHover}
            >
              {this.state.currentCanvas.map((pix, index) => {
                return (
                  <Pixel
                    color={pix.color}
                    grid={this.state.gridState}
                    id={index}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
