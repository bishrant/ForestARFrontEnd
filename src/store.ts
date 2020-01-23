import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState } from './StateLoader';
import jwt from 'jsonwebtoken';


let initialState: any = {
    user: {},
    login: false
}


if (loadState() !== null && typeof loadState() !== 'undefined' && typeof loadState().login !== "undefined") {
    console.log(loadState(), typeof loadState().login);
    const _token = loadState().user.token;
    const data = JSON.stringify({"token": _token})
    // const d = await fetch("https://localhost:5000/verifyToken", {
    //                         method: 'POST',
    //                         data: data}
    //                         )
    // const isLoginValid = jwt.v
    initialState = {
        user: loadState().user,
        login: true
    }
}


const middleware = [thunk]

const store: any = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;