import React, { Component } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent'
import * as PatternLibrary from './components/PatternLibrary'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <BoardComponent speed={500} initialPattern = {PatternLibrary.LIGHTWEIGHT_SPACESHIP}/>
      </div>
    );
  }
}

export default App;
