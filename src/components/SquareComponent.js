import React,{Component} from 'react';

export default class SquareComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isAlive: !!props.isAlive
    }
  }

  render(){

    const fillColour = this.state.isAlive
      ? 'green'
      : 'grey';

    const margin = 5;
    const size = 20;

    console.log("x: "+this.props.x);
    console.log("y: "+this.props.y);

    const inlineStyle = {
      x: this.props.x * 20 + margin + 'px',
      y: this.props.y * 20 + margin + 'px',
      width: size + 'px',
      height: size+ 'px',
      fill:fillColour,
      strokeWidth:margin,
      stroke:'rgb(0,0,0)'

    }

    //"fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"

    return <rect width={size+'px'} height={size+'px'} style={inlineStyle} />

  }

  step(){
    //calculate the step
    //if step changes notify board to change states of squares around me
  }

}
