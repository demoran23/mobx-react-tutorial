import React from 'react';
import Board from '../Board'
import {observer} from 'mobx-react';
const Game = observer(class Game extends React.Component {
    constructor({store}) {
        super();
        this.store = store;
    }
    
    store;
    
    handleClick(i) {
        console.log(`Square ${i} has been clicked!`);
        const squares = this.store.currentSquares.slice();

        if (this.store.winner != null ) {
            console.warn('The game has already been won!');
            return;
        }

        if (this.store.stepNumber !== this.store.history.length - 1){
            console.warn("Cannot change a square when in an old board state.");
            return;
        }

        // If someone has already won the game or played in this square, ignore the click
        if (squares[i] != null) {
            console.warn('Cannot change a square with a value already.');
            return;
        }

        squares[i] = this.store.playerToken;
        this.store.addNewSquares({squares});
    }

    jumpTo(step) {
        console.log(`Jumping to step ${step}!`);
        this.store.stepNumber = step;
    }

    render() {
        console.log('Rendering Game!')
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

        const current = this.store.currentSquares;

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