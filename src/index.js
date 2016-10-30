import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import './index.css';
//import StoreView from './components/StoreView';
import store from './store'

ReactDOM.render(
    <Game store={store} />,
    document.getElementById('root')
);