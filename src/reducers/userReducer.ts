import {FETCH_USER, NEW_USER, SIGNIN_USER } from '../actions/types';

const initialState = {}

export default function (state = initialState, action: any) {
    switch(action.type) {
        case NEW_USER:
            return action.payload
        case FETCH_USER:
            return {...state, user: action.payload}
        case SIGNIN_USER:
            console.log(action.payload);
            return action.payload
        default:
            return state;
    }
}