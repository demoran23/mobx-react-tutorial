import React from 'react';
import ReactDOM from 'react-dom';
//import Game from './components/Game';
import './index.css';
import StoreView from './components/StoreView';
import store from './store'

ReactDOM.render(
    <StoreView store={store} />,
    document.getElementById('root')
);