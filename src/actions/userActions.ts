
export const logout = () => {
    return {
        type: 'SIGNOUT_USER'
    }
}

export const signinUser = (user: any) => {
    return {
        type: 'SIGNIN_USER',
        payload: user
    }
}
// const signinUser = (user: any) => 