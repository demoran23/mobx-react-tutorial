import React from 'react';
import Board from '../Board'
export default class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            squares: Array(9).fill(null),
            playerToken: 'X',
            winner: null
        };
    }

    handleClick(i){
        // If someone has already won the game or played in this square, ignore the click
        if (this.state.winner != null || this.state.squares[i] != null)
            return;

        const squares = this.state.squares.slice();
        squares[i] = this.state.playerToken;
        this.setState({
            history: this.state.history.concat([{
                squares: squares
            }]),
            squares: squares,
            playerToken: this.state.playerToken === 'X' ? 'O' : 'X',
            winner: this.calculateWinner(squares)
        });
    }

    calculateWinner(squares) {
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
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares}
                           playerToken={this.state.playerToken}
                           winner={this.state.winner}
                           onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

}