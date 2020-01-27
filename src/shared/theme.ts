import { createMuiTheme } from "@material-ui/core";
import { green,  red } from "@material-ui/core/colors";

const top = {top : 120};
// const right
const center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  };
const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: red,
        error: red
    },
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: green[500],
                color: 'white',
                '&:hover': {
                    backgroundColor: green[900]
                }
            },
            label: {
                color: 'white'
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
        primary: red
    },
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: red[500],
                color: 'white',
                '&:hover': {
                    backgroundColor: red[900]
                }
            },
            label: {
                color: 'white'
            }
        }
    }
})

export {theme, errorTheme}