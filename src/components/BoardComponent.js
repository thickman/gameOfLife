import React,{Component} from 'react';
import SquareComponent from './SquareComponent'

export default class BoardComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      speed: 1500, //ms
      dimension: 6,
      viewBoard: [],
      dataBoard: [],
      startingCells: []
    }

    this.setStartingCells();
    this.initializeBoard();
  }

  setStartingCells(){
    this.addStartingCell(3,2);
    this.addStartingCell(4,2);
    this.addStartingCell(5,2);
    this.addStartingCell(3,3);
  }
  addStartingCell(i, j){
    //ES6 shorthand object props assign
    // same as {i: i, j: j}
    const cells = this.state.startingCells;
    cells.push(({i, j}));

    this.state = ({
      ...this.state,
      startingCells: cells
    })
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
      makeAlive = this.state.startingCells.find(cell => cell.i === i && cell.j === j)
      dataArr[k] = !!makeAlive;
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

  // help function to make prinitng more readable
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

    arg.setState({
      dataBoard: newDataBoard
    })
    return newDataBoard;
  }

  render(){

    const fillColour = 'yellow';

    const inlineStyle = {
      width: '400px',
      height: '400px',
      'backgroundColor':fillColour
    }

    console.log("dataBoard: "+ this.state.dataBoard);
    setTimeout(this.calculateNewState, this.state.speed, this);

    return (<svg>
      {
        this.state.dataBoard.map((square, index) => {
          const xy = this.get2d(index);
          return (
            <SquareComponent key={'sqr_'+index} x={xy.i} y={xy.j} isAlive={!!square}/>
          )
        })
      }
      </svg>
    );
    }
}
