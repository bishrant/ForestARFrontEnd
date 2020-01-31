import React, { Fragment } from "react";
import { IconButton } from "@material-ui/core";

const showSnackbar = (success: Boolean = false, openSnack: any, closeSnack: any, msg: any, target: any = "/", history: any, timeout: number = 10000) => {
    openSnack(msg, {
        variant: success === false ? 'error': 'default',
        key: msg,
        autoHideDuration: timeout,
        onClose: (c: any) => {
            if (target !== null) {
                history.push(target)
            }
        },
        action: <Fragment><IconButton color='inherit' size="small" onClick={() => { 
            closeSnack(msg); 
            if (target !== null) {
                history.push(target);
                
            }
        }}> X </IconButton>  </Fragment>
        
    });
}



const showErrors = (enqueueSnackbar: any, msg: any, target: any = "/", actions: any = null, closeSnackbar: any = null, timeout: number = 10000) => {
    enqueueSnackbar(msg, {
        variant: 'error',
        key: target,
        autoHideDuration: timeout,
        onClose: (c: any) => {
            console.log(target);
            
        },
        action: <Fragment><IconButton color='inherit' size="small" onClick={() => { 
            closeSnackbar(target); 
            if (target !== null) {
                window.location.replace(target)
            }
        
        }}> X </IconButton>  </Fragment>
        
    });
}


const showSuccess = (enqueueSnackbar: any, msg: any, target: string = "/", history: any, action: any, timeout: number = 5000) => {
    enqueueSnackbar(msg, {
        variant: 'default',
        autoHideDuration: 5000,
        onClose: (c: any) => {
            if (history !== null) {
                history.replace(target);
            }
            else {
                window.location.replace(target);
            }
        },
        action
    });
}

export { showErrors, showSuccess, showSnackbar }