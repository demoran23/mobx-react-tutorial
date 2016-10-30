import {extendObservable, observable} from "mobx";
export class Store {
    constructor() {
        extendObservable(this, {
            history: [{
                squares: observable(Array(9).fill(null))
            }],
            stepNumber: 0,
            sortMovesDescending: false
        });
    }
    history;

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

    addNewSquares(squares) {
        console.log('Adding new squares');
        if (!this.isMostRecentStep){
            console.error('Attempt to add new squares aborted.')
            return;
        }

        this.history.push(squares);
        this.stepNumber++;
    }

    stepNumber;
    sortMovesDescending;

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