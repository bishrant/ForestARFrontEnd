import jwt from 'jsonwebtoken';
import { loadState } from '../StateLoader';
import { LOGIN, LOGOUT } from '../actions/types';

const initialLoginState = false;

const LoginReducer = (state = initialLoginState, action: any) => {
    switch(action.type) {
        case LOGIN:
            return !state;
        case LOGOUT:
            return !state;
        default:
            return state;
    }
}
export default LoginReducer;