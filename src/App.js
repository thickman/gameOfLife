import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SquareComponent from './components/SquareComponent'
import BoardComponent from './components/BoardComponent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Something
          </p>

        </header>
        <BoardComponent/>
      </div>
    );
  }
}

export default App;
