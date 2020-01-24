// These must be the first lines in src/index.js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './shared/index.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import { Provider} from 'react-redux';
import  {store } from './utils/store';
import { saveState } from './utils/StateLoader';


store.subscribe(() => {
    console.log(store.getState());
    saveState(store.getState());
})
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
