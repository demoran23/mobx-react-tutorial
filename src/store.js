import {extendObservable, observable} from "mobx";
export class Store {
    constructor() {
        extendObservable(this, {
            history: [{
                squares: observable(Array(9).fill(null))
            }],
            playerToken: 'X',
            winner: null,
            stepNumber: 0,
            sortMovesDescending: false
        });
    }
    history;
    playerToken;
    winner;
    stepNumber;
    sortMovesDescending;

    incrementStepNumber(){
        console.log("Incrementing!")
        this.stepNumber = this.stepNumber + 1;
    }
}

let store = new Store();
export default store;