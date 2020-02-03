import {SIGNIN_USER, SIGNOUT_USER } from '../actions/types';
const initialState = {}

export default function (state = initialState, action: any) {
    switch(action.type) {
        case SIGNIN_USER:
            return action.payload
        case SIGNOUT_USER:
            return {}
        default:
            return state;
    }
}