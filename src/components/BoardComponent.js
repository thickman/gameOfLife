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

  initializeBoard(){
    const size = 6;
    const speed = 1;

    const arr = [];
    let makeAlive = false;

/*
    for(const i=0; i<size; i++) {
      arr[i] = [];
      for(const j=0; j<size; j++){
        makeAlive = i==3 && j==2;
        arr[i][j] = new Square(i, j, makeAlive)   //Component(i, j, isAlive: makeAlive);
      }
    }
    }
*/


  let i=0;
  let j=0;

  for(let k=0; k<size*size; k++) {
    console.log("k: "+k);
    makeAlive = i==3 && j==2;
    arr.push(
      <SquareComponent key={'sqr_'+k} x={i} y={j} isAlive={makeAlive}/>
    )
    i++;

    console.log("k: "+k+", i: "+i+", j: "+j);

    if(i >= size){
      i=0;
      j++;
    }

  }
    // tablica jednowymiarowa object o powyzszych parametreach
    // w render iterate through all items array2d.map=>{
    //  array=><Square component array>






      this.state  = {
        board: arr
      }


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

/*
      for(const i=0; i<arr.length; i++) {
        for(const j=0; j<arr[i].length; j++){


            return (a[i][j])
        }
      }


    */
    }
}
