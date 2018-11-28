import React from 'react';

export default class SquareComponent extends React.Component {

  onClick(e){
    this.props.onSquareClick({i: this.props.x, j: this.props.y});
  }

  render(){
    const fillColour = this.props.isAlive
      ? 'green'
      : 'grey';

    const margin = this.props.margin;
    const size = this.props.squareSize;

    const inlineStyle = {
      x: this.props.x * 20 + margin + 'px',
      y: this.props.y * 20 + margin + 'px',
      width: size + 'px',
      height: size+ 'px',
      fill:fillColour,
      strokeWidth:margin,
      stroke:'rgb(0,0,0)'
    }
    return <rect width={size+'px'} height={size+'px'} style={inlineStyle} onClick={this.onClick.bind(this)}/>
  }
}
