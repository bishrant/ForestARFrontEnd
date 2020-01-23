import { FETCH_USER, NEW_USER } from './types';

export const getUser = () => (dispatch: any) => {
    dispatch({ type: FETCH_USER, payload: localStorage.getItem('userInfo') })
}

export const addUser = (user: any) => (dispatch: any) => {
    dispatch({
        type: NEW_USER,
        payload: user
    })
}

export const login = () => {
    return {
        type: 'LOGIN'
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const signinUser = (user: any) => {
    console.log(user);
    return {
        type: 'SIGNIN_USER',
        payload: user
    }
}
// const signinUser = (user: any) => 