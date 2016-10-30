import {extendObservable, observable} from "mobx";
export class Store {
    constructor() {
        extendObservable(this, this);
    }

    history = [{ squares: Array(9).fill(null) }];

    get playerToken() {
        return (this.stepNumber % 2) ? 'X' : 'O';
    };

    get winner() {
        let winInfo = this.calculateWinInfo(this.lastSquares);
        return winInfo.winner;
    };

    get isMostRecentStep() {
        return this.stepNumber === this.history.length - 1;
    }

    get winningSquares() {
        if (!this.isMostRecentStep)
            return;

        let winInfo = this.calculateWinInfo(this.lastSquares);
        return winInfo.winningSquares;
    };

    get lastSquares() {
        return this.history[this.history.length - 1].squares;
    }

    get currentSquares() {
        console.log('Recalculating current squares!');
        return this.history[this.stepNumber].squares;
    };

    addMoveAtSquare(i) {
        const squares = this.currentSquares.slice();

        if (this.winner != null ) {
            console.warn('The game has already been won!');
            return;
        }

        if (!this.isMostRecentStep){
            console.warn("Cannot change a square when in an old board state.");
            return;
        }

        // If someone has already won the game or played in this square, ignore the click
        if (squares[i] != null) {
            console.warn('Cannot change a square with a value already.');
            return;
        }

        squares[i] = this.playerToken;
        this.history.push({squares});
        this.stepNumber++;
    }

    stepNumber = 0;
    sortMovesDescending = false;

    incrementStepNumber(){
        console.log("Incrementing!")
        this.stepNumber = this.stepNumber + 1;
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
}

let store = new Store();
export default store;