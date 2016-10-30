import React, {Component} from 'react';
import {observer} from 'mobx-react'

const StoreView = observer(class StoreView extends Component {
    render(){
        let store = this.props.appStore;
        return (
            <article>
                <p>Player Token: {store.playerToken}</p>
                <p>Step Number: {store.stepNumber}</p>
                <button onClick={() => store.incrementStepNumber()}>+1 step</button>
            </article>
        );
    }
});

export default StoreView;
