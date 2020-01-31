import {SIGNIN_USER, SIGNOUT_USER } from '../actions/types';
import { deleteLocalStorage } from '../utils/StateLoader';

const initialState = {}

export default function (state = initialState, action: any) {
    switch(action.type) {
        case SIGNIN_USER:
            return action.payload
        case SIGNOUT_USER:
            console.log(12)
            localStorage.removeItem('forestar')
            return {}
        default:
            return state;
    }
}