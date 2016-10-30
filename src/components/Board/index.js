import React from 'react';
import Square from '../Square'

export default class Board extends React.Component {
    constructor(){
        super();
        this.state = {
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
            squares: squares,
            playerToken: this.state.playerToken === 'X' ? 'O' : 'X',
            winner: this.calculateWinner(squares)
        });
    }


    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        let status;
        if (this.state.winner != null) {
            status = `Winner: ${this.state.winner}`;
        } else {
            status = `Next player: ${this.state.playerToken}`;
        }

        return (
            <div>
                <div className="status">{status}</div>
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
        );
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
}
