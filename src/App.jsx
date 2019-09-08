import React, { Component } from "react";
import isEqual from 'lodash.isequal';

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
      grid: true,
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
        };
        this.setState({ lastCanvas: oldCanvas, currentCanvas: newCanvas }, 
          () => {this.addHistory()});
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
      if(!isEqual(this.state.lastCanvas,this.state.currentCanvas)) {
        console.log('ghfghjhg')
        const arr = this.state.canvasHistory;
        if(arr.length === 20)
          arr.shift();
        arr.push(this.state.lastCanvas);
        this.setState({canvasHistory: arr, historyIndex: arr.length - 1});
      };
    };

    this.handleUndo = () => {
      if(this.state.historyIndex > 0) {
        this.setState({
          currentCanvas: this.state.canvasHistory[this.state.historyIndex],
          historyIndex: this.state.historyIndex - 1
        })
      }
    };

    this.handleColorChange = event => {
      if (event.target.id !== "") {
        this.setState({ activeColor: this.state.swatches[event.target.id] });
      }
    };

    this.handleGrid = () => {
      this.setState({ grid: !this.state.grid });
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
    const pixels = Array.from({ length: 4 }, () => ({ color: "white" }));
    const arr = []; Array.from({ length: 4 }, () => ({ color: "white" }));
    arr.push(Array.from({ length: 4 }, () => ({ color: "white" })));
    this.setState({ currentCanvas: pixels, canvasHistory: arr});
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
            color={this.state.activeColor}
            swatch={this.state.swatches}
            mode={this.state.activeMode}
            gridState={this.state.grid}
            handleColorChange={this.handleColorChange}
            handleGrid={this.handleGrid}
            handleUndo={this.handleUndo}
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
                    grid={this.state.grid}
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
