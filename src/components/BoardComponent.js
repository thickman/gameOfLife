import React from 'react';
import SquareComponent from './SquareComponent'
import './../Board.scss';

export default class BoardComponent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      speed: 1500, //ms
      dimension: 20,
      dataBoard: [],
      startingCells: [],
      isRunning: false,
      squareSize: 20,
      squareMargin: 5,
      counter: 0
    }

    this.setStartingCells();
    this.initializeBoard();
  }

  setStartingCells(){
    const arr =
      [[6,5],[6,6],[8,8],[8,9],[9,8],[9,9],[7,5],[7,6]]
    ;
    arr.forEach(cell => this.addStartingCell(cell[0], cell[1]));
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

  initializeBoard(){
    const dimension = this.state.dimension; // pass as props.dimension

    const dataArr = [];
    let makeAlive = false;

    let i=0;
    let j=0;


    for(let k=0; k<dimension*dimension; k++) {
      makeAlive = this.state.startingCells.find(cell => cell[0] === i && cell[1] === j)
      dataArr[k] = !!makeAlive;
      i++;

      if(i >= dimension){
        i=0;
        j++;
      }
    }
    this.state  = {
      ...this.state,
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
      const neighbourAmount = arg.liveNeighboursOf(xy.i, xy.j);

      const makeAlive =
        (neighbourAmount === 3 && !isAlive) ||
        ((neighbourAmount === 2 || neighbourAmount === 3) && isAlive);

      return makeAlive;
    })

    arg.setState({
      dataBoard: newDataBoard,
      counter: arg.state.counter+1
    })
    return newDataBoard;
  }

  onSquareClick(target){

    if(this.state.isRunning) return;

    // we probably don't need to update that 2 lines as it's used only to initialise the board
    const cells = this.state.startingCells;
    cells.push(([target.i, target.j]));

    let dataArr = this.state.dataBoard;
    const index = this.get1d(target.i, target.j);
    dataArr[index] = true;

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
    const svgSize = (this.state.squareSize) * this.state.dimension + 2* this.state.squareMargin;

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
              <SquareComponent key={'sqr_'+index} x={xy.i} y={xy.j} isAlive={!!square} margin={this.state.squareMargin} squareSize={this.state.squareSize} onSquareClick={this.onSquareClick.bind(this)}/>
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
