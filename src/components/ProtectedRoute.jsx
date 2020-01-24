import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

// export const ProtectedRoute = (pp: any) => {
//     const {Component, ...rest} = pp;

//     if (isLoggedIn()) {
//         return <Route {...rest}></Route>
//     }
//     return (

//         <Route 
//         {...rest} 
//         render={(props) => isLoggedIn() ? <Component {...props} />: <div>Not logged in</div>}



//         />

//     )
// }

export const PrivateRoute = ({ children, ...rest }) => {
    const user = useSelector((state) => state.user);
    // console.log(user);
    const isLoggedIn = () => {
        return (typeof user.firstName !== 'undefined' && typeof user.token !== 'undefined')
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoggedIn() ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}