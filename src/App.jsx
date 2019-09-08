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
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "pink",
        "brown",
        "gray",
        "white",
        "black",
        "silver",
        "cyan",
        "magenta",
        "beige"
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
            return alert("paint not ready yet");
          //return this.handlePaint(null, event.target.id, targetedPixel.color, activeColor);
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
        const arr = this.state.canvasHistory.slice(0,this.state.historyIndex + 1);
        console.log(arr);
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
      if (event.target.id !== "") {
        this.setState({ activeColor: this.state.swatches[event.target.id] });
      }
    };

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
      const newCanvas = this.state.currentCanvas;
      // canvas[event.target.id].color = this.state.activeColor;
      // this.setState({ currentCanvas: })

      //set colorToCheck to be the color of the clicked pixel
      //paint clicked pixel the active color
      //check if up, left, down, and right pixels have the same color as colorToCheck
    };
  }

  componentDidMount() {
    const pixels = Array.from({ length: 400 }, () => ({ color: "white" }));
    const arr = [];
    arr.push(Array.from({ length: 400 }, () => ({ color: "white" })));
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
