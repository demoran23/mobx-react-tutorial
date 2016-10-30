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
        this.store.addMoveAtSquare(i);
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
                        <a href="#" onClick={() => this.store.stepNumber = move}><b>{desc}</b></a>
                    </li>
                );

            return (
                <li key={move}>
                    <a href="#" onClick={() => this.store.stepNumber = move}>{desc}</a>
                </li>
            );

        });

        if (this.store.sortMovesDescending){
            moves = moves.reverse();
        }

        return (

            <div className="game">
                <div className="game-board">
                    <Board squares={this.store.currentSquares}
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