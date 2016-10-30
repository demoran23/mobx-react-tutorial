import React from 'react';
import ReactDOM from 'react-dom';
//import Game from './components/Game';
import './index.css';
import StoreView from './components/StoreView';
import appStore from './store'

ReactDOM.render(
    <StoreView appStore={appStore} />,
    document.getElementById('root')
);