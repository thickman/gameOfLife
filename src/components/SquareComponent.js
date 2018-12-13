import React from 'react';

export default class SquareComponent extends React.Component {

  onClick(e){
    this.props.onSquareClick({i: this.props.x, j: this.props.y});
  }

  render(){
    const fillColour = this.props.isAlive
      ? 'green'
      : 'rgba(0, 0, 0, 0.2)';

    const margin = this.props.margin;
    const size = this.props.squareSize;

    let inlineStyle = {
      x: this.props.x * 20 + margin + 'px',
      y: this.props.y * 20 + margin + 'px',
      width: size + 'px',
      height: size+ 'px',
      fill:fillColour,
      strokeWidth:margin,
      stroke:'rgb(0,0,0)'
    }

    if(!this.props.isVisible){
      inlineStyle = {...inlineStyle, stroke:'rgba(0,0,0, 0.15)'} // ultimately set display: none 
    }

    return <rect width={size+'px'} height={size+'px'} style={inlineStyle} onClick={this.onClick.bind(this)}/>
  }
}
