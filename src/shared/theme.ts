import { createMuiTheme } from "@material-ui/core";
import {  red,  blueGrey, indigo, deepOrange } from "@material-ui/core/colors";

const top = {top : 120};
// const right
const center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  };
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#10EBFC'
        },
        secondary: deepOrange,
        error: red
    },
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: 'rgb(19 179 191)',//blueGrey[600],
                color: 'white',
                '&:hover': {
                    backgroundColor: blueGrey[900]
                }
            },
            label: {
                color: 'white'
            }
        },
        MuiLink: {
           root: {
            color: indigo[800],
            fontSize: 14
           }
        },
        MuiSnackbar: {
            root: {
                anchorOriginTopCenter :{
                    ...top,...center
                    
                },
                anchorOriginTopLeft: {
                    ...top
                }
            }
           
        },
        
        MuiSnackbarContent: {
            
        } 
    }
})

const errorTheme = createMuiTheme({
    palette: {
        primary: deepOrange
    },
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: deepOrange[900],
                color: 'white',
                '&:hover': {
                    backgroundColor: deepOrange[500]
                }
            },
            label: {
                color: 'white'
            }
        }
    }
})

export {theme, errorTheme}