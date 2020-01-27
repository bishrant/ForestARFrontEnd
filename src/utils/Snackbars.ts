import React from "react";

const showErrors = (enqueueSnackbar: any, msg: any, target: string ="/", timeout: number = 50000) => {
    enqueueSnackbar(msg, {
        variant: 'error',
        autoHideDuration: timeout,
        onClose: (c: any) => {
            window.location.replace(target)
        },
    });
}



// const showSuccessSnack = (enqueueSnackbar: any, msg: any, target: string="/", timeout: number = 5000, action: ) => {

// }
// enqueueSnackbar(`Please check your email to reset your password.`, {
//     variant: 'default', anchorOrigin: {
//         vertical: 'top',
//         horizontal: 'center',
//     },
//     autoHideDuration: 5000,
//     onClose: (c: any) => {
//         history.replace('/');
//     },
//     action
// });

export {showErrors}