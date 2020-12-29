import React from "react";
import Square from "./Square";

const checkGameWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  isBoardFull(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        return false;
      }
    }
    return true;
  }

  restartGame() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          const squares = this.state.squares.slice();
          if (checkGameWinner(squares) || squares[i]) {
            return;
          }
          squares[i] = this.state.xIsNext ? "X" : "O";
          this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
          });
        }}
      />
    );
  }

  render() {
    const winner = checkGameWinner(this.state.squares);
    const currentPlayer = this.state.xIsNext ? "X" : "O";
    let startNewGame = false;

    let currentStatus;
    let gamePlayer;

    if (winner) {
      gamePlayer = winner === "X" ? "Player 1" : "Player 2";
      currentStatus = "Winner is: " + gamePlayer;
      startNewGame = true;
    } else if (this.isBoardFull(this.state.squares)) {
      currentStatus = "Draw. No one won.";
      startNewGame = true;
    } else {
      gamePlayer =
        winner === "X" || currentPlayer === "X" ? "Player 1" : "Player 2";
      currentStatus = gamePlayer + " : " + currentPlayer;
      startNewGame = false;
    }

    return (
      <div className="game">
        <div className="game-board">
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        </div>

        <div className="currentStatus">{currentStatus}</div>
        {startNewGame ? (
          <div className="restart-button">
            <button className="restart" onClick={() => this.restartGame()}>
              Reset
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
