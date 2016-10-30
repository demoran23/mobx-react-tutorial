import React from 'react';
import Board from '../Board'
export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            playerToken: 'X',
            winner: null,
            stepNumber: 0
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        // If someone has already won the game or played in this square, ignore the click
        if (this.state.winner != null || squares[i] != null) {
            return;
        }

        const stepNumber = this.state.history.length;

        squares[i] = this.state.playerToken;

        this.setState({
            history: this.state.history.concat([{
                squares: squares
            }]),
            stepNumber: stepNumber,
            playerToken: this.state.playerToken === 'X' ? 'O' : 'X',
            winner: this.calculateWinner(squares)
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            playerToken: (step % 2) ? 'X' : 'O',
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
        const moves = this.state.history.map((step, move) => {
            const desc = move ?
            'Move #' + move :
                'Game start';

            let isCurrentStep = move === this.state.stepNumber;

            if (isCurrentStep)
                return (
                    <li key={move}>
                        <a href="#" onClick={() => this.jumpTo(move)}><b>{desc}</b></a>
                    </li>
                );

            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );

        });

        const current = this.state.history[this.state.stepNumber].squares;

        return (

            <div className="game">
                <div className="game-board">
                    <Board squares={current}
                           playerToken={this.state.playerToken}
                           winner={this.state.winner}
                           onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

}