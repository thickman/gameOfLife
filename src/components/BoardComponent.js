import React,{Component} from 'react';
import SquareComponent from './SquareComponent'

export default class BoardComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      speed: 3000, //ms
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
      makeAlive = i==3 && j==2 ||
        i==4 && j==2 ||
        i==5 && j==2;


      /*
      arr.push(
        // TODO: usunac to - ta linia tylko przy render, tutaj tworzyc tylko dataBoard
        <SquareComponent key={'sqr_'+k} x={i} y={j} isAlive={makeAlive} onSquareChanged={this.onStateChanged}/>
      )
*/
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
    const ij = k < this.state.dimension
      ? {i: k , j: 0}
      : {
        i: k % this.state.dimension, j: Math.floor(k / this.state.dimension)
      }
      return ij;
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

    //console.log("k: "+k);
    //console.log("dataBoardOfMe: "+ dataBoard[k]);

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


  printIndexes(array){
    const newDataBoardPrint = array.reduce((printableDataBoard, current, index) => {
      if(current){
        printableDataBoard.push(index);
      }
      return printableDataBoard;
    }, [])


    return newDataBoardPrint;
  }


  calculateNewState(arg){

    const newDataBoard = arg.state.dataBoard.map((isAlive, index) => {
      const xy = arg.get2d(index);
      const neighbourAmount = arg.liveNeighboursOf(xy.i, xy.j);

      const makeAlive =
        (neighbourAmount === 3 && !isAlive) ||
        ((neighbourAmount === 2 || neighbourAmount == 3) && isAlive);

      return makeAlive;
    })


    const oldDataBoardPrint = arg.printIndexes(arg.state.dataBoard);
    const newDataBoardPrint = arg.printIndexes(newDataBoard);
    console.log("oldDataBoardPrint: "+oldDataBoardPrint);
    console.log("newDataBoardPrint: "+newDataBoardPrint);



    //console.log("newDataBoard: "+newDataBoard);


    arg.setState({
      dataBoard: newDataBoard
    })
    return newDataBoard;
  }

  onChangeState(x, y) {

  }

  render(){
    //const speed = this.props.speed;

    const fillColour = 'yellow';

    const inlineStyle = {
      width: '400px',
      height: '400px',
      'backgroundColor':fillColour
    }

    console.log("dataBoard: "+ this.state.dataBoard);

    //const one = this.liveNeighboursOf(1,3);
    //const two = this.liveNeighboursOf(3,2);
    //const three = this.liveNeighboursOf(2,2);

    //console.log("one: "+one);
    //console.log("two: "+two);
    //console.log("three: "+three);

    setTimeout(this.calculateNewState, this.state.speed, this);

    return (<svg>
      {
        this.state.dataBoard.map((square, index) => {
          //console.log("index: "+index);
          const xy = this.get2d(index);
          //console.log("xy: "+JSON.stringify(xy));
          return (
            <SquareComponent key={'sqr_'+index} x={xy.i} y={xy.j} isAlive={!!square}/>
          )
        })
      }
      </svg>
    );
    }
}
