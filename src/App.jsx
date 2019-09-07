import React, { Component } from 'react';
import './App.css';

import Pixel from './components/Pixel';
import ToolBar from './components/ToolBar';

class App extends Component {
  constructor() {
    super();

    this.state = {
      activeColor: 'yellow',
      grid: true,
      pixels: [],
      swatches: [
        'red','blue','green','yellow','orange','pink','brown','gray','white','black', 'silver', 'cyan', 'magenta', 'beige'
      ]
    }

    this.handleClick = (event) => {
      if (event.target.id !== '') {
        const canvas = this.state.pixels;
        canvas[event.target.id].color = this.state.activeColor;
        this.setState({ pixels: canvas })
      }
    }

    this.handleHover = (event) => {
      if (event.buttons === 1 && event.target.id !== '') {
        const canvas = this.state.pixels;
        canvas[event.target.id].color = this.state.activeColor;
        this.setState({ pixels: canvas })
      }
    }

    this.handleColorChange = (event) => {
      if (event.target.id !== '') {
        this.setState({ activeColor: this.state.swatches[event.target.id] })
      }
    }

    this.handleGrid = () => {
      this.setState({grid: !this.state.grid})
    }
  }

  componentDidMount() {
    const pixels = Array.from({ length: 400 }, () => ({ color: 'white' }));
    this.setState({ pixels: pixels });
  }

  render() {
    const style = {
      workspace: {
        display: 'flex',
      },
      container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      canvas: {
        minWidth: 540,
        width: 540,
        height: 540
      },

    }

    return (
      <div className='App'>
        <div></div>
        <div style={style.workspace}>
          <ToolBar
            color={this.state.activeColor}
            swatch={this.state.swatches}
            gridState={this.state.grid}
            handleColorChange={this.handleColorChange}
            handleGrid={this.handleGrid}
          />
          <div style={style.container}>
            <div style={style.canvas} onMouseDown={this.handleClick} onMouseOver={this.handleHover}>
              {this.state.pixels.map((pix, index) => {
                return <Pixel color={pix.color} grid={this.state.grid} id={index} key={index} />
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
