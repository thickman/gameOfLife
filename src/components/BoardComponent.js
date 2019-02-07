import React from 'react';
import SquareComponent from './SquareComponent'
import './../Board.scss';
import * as PatternLibrary from './PatternLibrary'

export default class BoardComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      speed: this.getSpeed(),
      dataBoard: this.getInitialBoard(),
      startingCells: props.initialPattern.cells,
      isRunning: false,
      counter: 0
    }
  }

  getSpeed(){
    if(this.props.speed){
        return this.props.speed;
    }
    if(this.props.initialPattern.speed){
      return this.props.initialPattern.speed
    }
    return this.props.defaultSpeed;
  }

  getInitialBoard(patternLib){
    const dimension = this.props.dimension;

    const dataArr = [];
    let makeAlive = false;

    let i=0;
    let j=0;

    for(let k=0; k<dimension*dimension; k++) {
      makeAlive = this.props.initialPattern.cells.find(cell => cell[0] === i && cell[1] === j)
      dataArr[k] = !!makeAlive;
      i++;

      if(i >= dimension){
        i=0;
        j++;
      }
    }

    return dataArr;

  }

  addStartingCell(i, j){
    //ES6 shorthand object props assign
    // same as {i: i, j: j}
    const cells = this.state.startingCells;
    cells.push(([i, j]));

    this.state = ({
      ...this.state,
      startingCells: cells
    })
  }

  get2d(k){
    const ij = k < this.props.dimension
      ? {i: k , j: 0}
      : {
        i: k % this.props.dimension,
        j: Math.floor(k / this.props.dimension)
      }
      return ij;
  }

  get1d(i, j){
    return j* this.props.dimension + i;
  }

  countLiveNeighboursOf(i,j){
    let dataBoard = this.state.dataBoard;
    let width = this.props.dimension;
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
  // usage: const oldDataBoardPrint = arg.printIndexes(arg.state.dataBoard);
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
    if(!arg.state.dataBoard.find(cell => !!cell)){
      return;
    }

    const newDataBoard = arg.state.dataBoard.map((isAlive, index) => {
      const xy = arg.get2d(index);
      const neighbourAmount = arg.countLiveNeighboursOf(xy.i, xy.j);

      const makeAlive =
        (neighbourAmount === 3 && !isAlive) ||
        ((neighbourAmount === 2 || neighbourAmount === 3) && isAlive);

      return makeAlive;
    })

    // TODO: let the function return newDataBoard and move below piece outside
    arg.setState({
      dataBoard: newDataBoard,
      counter: arg.state.counter+1
    })
  }

  onSquareClick(target){

    // set board state before running
    if(this.state.isRunning) return;

    // we probably don't need to update that 2 lines as it's used only to initialise the board
    let cells = this.state.startingCells;
    const cellIndexInStartingArr = cells.findIndex(cell => (cell[0] === target.i && cell[1] === target.j));

    // add or remove
    if(cellIndexInStartingArr === -1){
        cells.push(([target.i, target.j]));
    }
    else{
      cells = cells.slice(0,cellIndexInStartingArr).concat(cells.slice(cellIndexInStartingArr+1, cells.length));
    }

    const index = this.get1d(target.i, target.j);
    let dataArr = this.state.dataBoard;
    dataArr[index] = !dataArr[index];

    this.setState({
      startingCells: cells,
      dataBoard: dataArr
    })
  }

  runGame(){
    this.setState({isRunning: true});
  }

  clearStartingPos(){
    if(this.state.isRunning) return;

    this.setState({
      startingCells: [],
      dataBoard: this.state.dataBoard.map(cell => false )
    })
  }

  pauseGame(){
    this.setState({
      isRunning: false,
     });
  }

  render(){
    const fillColour = 'white';

    // can we avoid passing this here and this calculation in order to center
    const svgSize = (this.props.squareSize) * this.props.dimension + 2 * this.props.squareMargin;

    const inlineStyle = {
      'backgroundColor':fillColour,
      width:  `${svgSize}px`,
      height: `${svgSize}px`
    }

    if(this.state.isRunning){
        setTimeout(this.calculateNewState, this.state.speed, this);
    }

    return (
      <div className='board-container'>
        <div className='label'><p>Game of Life</p></div>
        <svg className='board' style={inlineStyle}>
        {
          this.state.dataBoard.map((square, index) => {
            const xy = this.get2d(index);
            return (
              <SquareComponent
                key={'sqr_'+index}
                x={xy.i}
                y={xy.j}
                isAlive={!!square}
                margin={this.props.squareMargin}
                squareSize={this.props.squareSize}
                onSquareClick={this.onSquareClick.bind(this)}/>
            )
          })
        }
        </svg>
        <div className = 'button-bar'>
          <button disabled={this.state.isRunning} onClick={this.runGame.bind(this)}>run game</button>
          <button disabled={this.state.isRunning} onClick={this.clearStartingPos.bind(this)}>clear board</button>
          <button disabled={!this.state.isRunning} onClick={this.pauseGame.bind(this)}>pause</button>
        </div>
        <p>Counter: {this.state.counter}</p>
        <p>{JSON.stringify(this.state.startingCells)}</p>
      </div>
    );
    }
}

BoardComponent.defaultProps = {
  defaultSpeed: 300, //ms
  dimension: 20,
  squareSize: 20,
  squareMargin: 5,
  initialPattern: PatternLibrary.LIGHTWEIGHT_SPACESHIP,
};
