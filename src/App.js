
import React, { Component } from 'react';
import './App.css';
import './TicTacToe.css';
import Game from './components/Game'

export default class App extends Component {
  
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <h1>Cision TIC-TAC-TOE Game</h1>
        </div>
        <p className="App-container">
          <Game></Game>
        </p>
      </div>
    )
  }
  
};
