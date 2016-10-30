import React from 'react';
import Board from '../Board'
import {observer} from 'mobx-react';
const Game = observer(class Game extends React.Component {
    constructor({store}) {
        super();
        // this.state = {
        //     history: [{
        //         squares: Array(9).fill(null)
        //     }],
        //     playerToken: 'X',
        //     winner: null,
        //     stepNumber: 0,
        //     sortMovesDescending: false
        // };
        this.store = store;
    }
    
    store;
    
    handleClick(i) {
        console.warn('Click!');
        const history = this.store.history;
        const current = history[this.store.stepNumber];
        const squares = current.squares;

        // If someone has already won the game or played in this square, ignore the click
        if (this.store.winner != null || squares[i] != null) {
            console.log('Nothing has changed, aborting click.');
            return;
        }

        const stepNumber = this.store.history.length;

        squares[i] = this.store.playerToken;
        let winInfo = this.calculateWinInfo(squares);
        this.store.history.push({squares});
        this.store.stepNumber = stepNumber;
        this.store.playerToken = this.store.playerToken === 'X' ? 'O' : 'X';
        this.store.winner = winInfo.winner;
        this.store.winningSquares = winInfo.winningSquares;
        // this.setState({
        //     history: this.store.history.concat([{
        //         squares: squares
        //     }]),
        //     stepNumber: stepNumber,
        //     playerToken: this.store.playerToken === 'X' ? 'O' : 'X',
        //     winner: winInfo.winner,
        //     winningSquares: winInfo.winningSquares
        // });
    }

    jumpTo(step) {
        this.store.stepNumber = step;
        this.store.playerToken = (step % 2) ? 'X' : 'O';
        // this.setState({
        //     stepNumber: step,
        //     playerToken: (step % 2) ? 'X' : 'O',
        // });
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
        let moves = this.store.history.map((step, move) => {
            const desc = move ?
            'Move #' + move :
                'Game start';

            let isCurrentStep = move === this.store.stepNumber;

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

        if (this.store.sortMovesDescending){
            moves = moves.reverse();
        }

        const current = this.store.history[this.store.stepNumber].squares;

        return (

            <div className="game">
                <div className="game-board">
                    <Board squares={current}
                           playerToken={this.store.playerToken}
                           winner={this.store.winner}
                           winningSquares={this.store.winningSquares}
                           onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <button onClick={() => this.store.sortMovesDescending = !this.store.sortMovesDescending}>
                        Toggle sort order
                    </button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

});

export default Game;