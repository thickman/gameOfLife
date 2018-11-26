import React,{Component} from 'react';
import SquareComponent from './SquareComponent'

export default class BoardComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      size: false,
      board: []
    }

    this.initializeBoard();
  }

  onSquareChanged(x, y){

    //checkAffected()
  }

  initializeBoard(){
    const size = 6;
    const speed = 1;

    const arr = [];
    let makeAlive = false;

    let i=0;
    let j=0;

    for(let k=0; k<size*size; k++) {
      makeAlive = i==3 && j==2;
      arr.push(
        <SquareComponent key={'sqr_'+k} x={i} y={j} isAlive={makeAlive} onSquareChanged={this.onStateChanged}/>
      )
      i++;

      if(i >= size){
        i=0;
        j++;
      }
    }
    this.state  = {
      board: arr
    }
  }

  onChangeState(x, y) {

  }

  render(){
    //const size = this.props.dimension;
    //const speed = this.props.speed;

    const fillColour = 'yellow';

    const inlineStyle = {
      width: '400px',
      height: '400px',
      'backgroundColor':fillColour
    }

    return (<svg>
      {this.state.board}
      </svg>
    );
    }
}
