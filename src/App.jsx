import React, { Component } from "react";

import Pixel from "./components/Pixel";
import ToolBar from "./components/ToolBar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      activeColor: "yellow",
      activeMode: "draw",
      paintHelper: {
        num: 0,
        canvas: []
      },
      grid: true,
      pixels: [],
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
        const canvas = this.state.pixels;
        const targetedPixel = canvas[event.target.id];
        const activeColor = this.state.activeColor;

        switch (this.state.activeMode) {
          case "draw":
            targetedPixel.color = activeColor;
            return this.setState({ pixels: canvas });
          case "erase":
            targetedPixel.color = "white";
            return this.setState({ pixels: canvas });
          case "paint":
            return alert("this");
          //return this.handlePaint(null, event.target.id, targetedPixel.color, activeColor);
          default:
            return alert("hmmm...");
        }
      }
    };

    this.handleHover = event => {
      if (event.buttons === 1 && event.target.id !== "") {
        const canvas = this.state.pixels;
        switch (this.state.activeMode) {
          case "draw":
            canvas[event.target.id].color = this.state.activeColor;
            break;
          case "erase":
            canvas[event.target.id].color = "white";
            break;
          default:
            break;
        }
        this.setState({ pixels: canvas });
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
      const canvas = this.state.pixels;
      // canvas[event.target.id].color = this.state.activeColor;
      // this.setState({ pixels: })

      //set colorToCheck to be the color of the clicked pixel
      //paint clicked pixel the active color
      //check if up, left, down, and right pixels have the same color as colorToCheck
    };
  }

  componentDidMount() {
    const pixels = Array.from({ length: 400 }, () => ({ color: "white" }));
    this.setState({ pixels: pixels });
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
      <div className="App">
        <div></div>
        <div style={style.workspace}>
          <ToolBar
            color={this.state.activeColor}
            swatch={this.state.swatches}
            mode={this.state.activeMode}
            gridState={this.state.grid}
            handleColorChange={this.handleColorChange}
            handleGrid={this.handleGrid}
            handleMode={this.handleMode}
          />
          <div style={style.container}>
            <div
              style={style.canvas}
              onMouseDown={this.handleClick}
              onMouseOver={this.handleHover}
            >
              {this.state.pixels.map((pix, index) => {
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
