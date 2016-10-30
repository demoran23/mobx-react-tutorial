import {extendObservable} from "mobx";
export class Store {
    constructor() {
        extendObservable(this, {
            playerToken: 'X',
            stepNumber: 0,
        });
    }
    // history;
    playerToken;
    // winner;
    stepNumber;
    // sortMovesDescending;

    incrementStepNumber(){
        console.log("Incrementing!")
        this.stepNumber = this.stepNumber + 1;
    }
}

let store = new Store();
export default store;