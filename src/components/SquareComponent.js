import React,{Component} from 'react';

export default class SquareComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const fillColour = this.props.isAlive
      ? 'green'
      : 'grey';

    const margin = 5;
    const size = 20;

    const inlineStyle = {
      x: this.props.x * 20 + margin + 'px',
      y: this.props.y * 20 + margin + 'px',
      width: size + 'px',
      height: size+ 'px',
      fill:fillColour,
      strokeWidth:margin,
      stroke:'rgb(0,0,0)'
    }
    return <rect width={size+'px'} height={size+'px'} style={inlineStyle} />
  }
}
