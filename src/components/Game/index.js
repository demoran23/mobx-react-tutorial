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
            stepNumber: 0,
            sortMovesDescending: false
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
        let winInfo = this.calculateWinInfo(squares);
        this.setState({
            history: this.state.history.concat([{
                squares: squares
            }]),
            stepNumber: stepNumber,
            playerToken: this.state.playerToken === 'X' ? 'O' : 'X',
            winner: winInfo.winner,
            winningSquares: winInfo.winningSquares
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            playerToken: (step % 2) ? 'X' : 'O',
        });
    }

    calculateWinInfo(squares) {
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
                return {
                    winner: squares[a],
                    winningSquares : [ a, b, c ]
                };
            };
        }

        return {winner: null, winningSquares: null};
    }

    render() {
        let moves = this.state.history.map((step, move) => {
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

        if (this.state.sortMovesDescending){
            moves = moves.reverse();
        }
        const current = this.state.history[this.state.stepNumber].squares;

        return (

            <div className="game">
                <div className="game-board">
                    <Board squares={current}
                           playerToken={this.state.playerToken}
                           winner={this.state.winner}
                           winningSquares={this.state.winningSquares}
                           onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <button onClick={() => this.setState({ sortMovesDescending : !this.state.sortMovesDescending})}>
                        Toggle sort order
                    </button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

}