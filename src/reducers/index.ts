import { combineReducers} from 'redux';
import userReducer  from './userReducer';
import LoginReducer from './LoginReducer';

export default combineReducers({
    user: userReducer,
    login: LoginReducer
})