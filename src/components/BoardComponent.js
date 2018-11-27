import React,{Component} from 'react';
import SquareComponent from './SquareComponent'

export default class BoardComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      dimension: 6,
      viewBoard: [],
      dataBoard: [],
    }

    this.initializeBoard();
  }

  onSquareChanged(x, y){

    //checkAffected()
  }

  initializeBoard(){
    const dimension = this.state.dimension; // pass as props.dimension
    const speed = 1;

    const arr = [];
    const dataArr = [];
    let makeAlive = false;

    let i=0;
    let j=0;

    for(let k=0; k<dimension*dimension; k++) {
      makeAlive = i==3 && j==2;
      arr.push(
        <SquareComponent key={'sqr_'+k} x={i} y={j} isAlive={makeAlive} onSquareChanged={this.onStateChanged}/>
      )

      dataArr[k] = makeAlive ? true : false;

      i++;

      if(i >= dimension){
        i=0;
        j++;
      }
    }
    this.state  = {
      ...this.state,
      viewBoard: arr,
      dataBoard: dataArr
    }
  }

  get2d(k){
    const ij = k < this.state.dimension - 1
      ? {i: k , j: 0}
      : {
        i: k % this.state.dimension, j: Math.ceil(k / 3)
      }
  }

  get1d(i, j){
    return j* this.state.dimension + i;
  }

  liveNeighboursOf(i,j){
    let viewBoard = this.state.viewBoard;
    let dataBoard = this.state.dataBoard;
    let width = this.state.dimension;



    let hasUp, hasDown, hasLeft, hasRight;

    const k = this.get1d(i, j);

    console.log("k: "+k);

    console.log("dataBoardOfMe: "+ dataBoard[k]);

    hasUp    = j > 0;
    hasDown  = j < width - 1;
    hasLeft  = i > 0;
    hasRight = i < width - 1;

    const neighbours = [];



    neighbours[0] = hasUp && hasLeft
      ? dataBoard[k - width - 1]
      : false;

    neighbours[1] = hasUp
    ? dataBoard[k - width]
    : false;

    neighbours[2] = hasUp && hasRight
    ? dataBoard[k - width + 1]
    : false;

    neighbours[3] = hasLeft
    ? dataBoard[k - 1]
    : false;

    neighbours[4] = hasRight
    ? dataBoard[k + 1]
    : false;

    neighbours[5] = hasDown && hasLeft
    ? dataBoard[k + width - 1]
    : false;

    neighbours[6] = hasDown
      ? dataBoard[k + width]
      : false;

    neighbours[7] = hasDown && hasRight
      ? dataBoard[k + width + 1]
      : false;

    return neighbours.filter(neighbour => (!!neighbour)).length

  }

  onChangeState(x, y) {

  }

  render(){
    //const dimension = this.props.dimension;
    //const speed = this.props.speed;

    const fillColour = 'yellow';

    const inlineStyle = {
      width: '400px',
      height: '400px',
      'backgroundColor':fillColour
    }

    console.log("dataBoard: "+ this.state.dataBoard);


    const one = this.liveNeighboursOf(1,3);
    const two = this.liveNeighboursOf(3,2);
    const three = this.liveNeighboursOf(2,2);

    console.log("one: "+one);
    console.log("two: "+two);
    console.log("three: "+three);

    return (<svg>
      {this.state.viewBoard}
      </svg>
    );
    }
}
