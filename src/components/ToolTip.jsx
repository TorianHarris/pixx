import React, { Component } from 'react';

const style = {
  root: {
    position: 'relative',
    display: 'inline-block',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    marginTop: '-15px',
    right: '100%',
    borderWidth: 15,
    borderStyle: 'solid',
    borderColor: 'transparent white transparent transparent',
  },
  label: {
    backgroundColor: 'white',
    position: 'absolute',
    left: '150%',
    top: '50%',
    marginLeft: '-40px',
    marginTop: '-40px',
    display: 'inline-block',
    height: 80,
    width: 150,
    textAlign: 'center',
    borderRadius: '5%'
  }
}

export default class ToolTip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.handleToggle = () => {
      this.setState({ active: !this.state.active })
    };

    this.handleClick = event => {
      if (this.state.active && this.node.contains(event.target)) return;
      else this.setState({ active: false });
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  render() {
    return (
      <div style={style.root} ref={node => (this.node = node)}>
        {React.cloneElement(this.props.children, { onClick: this.handleToggle })}
        {this.state.active ?
          <div style={style.label} >
            <div style={style.arrow} />
          </div>
          : null}
      </div>
    );
  }
}