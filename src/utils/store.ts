import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


let initialState: any = {
    user: {},
    login: false
}

const middleware = [thunk]

const store: any = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export {store};