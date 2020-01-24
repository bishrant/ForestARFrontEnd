import { createMuiTheme } from "@material-ui/core";
import { green,  red } from "@material-ui/core/colors";

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
            }
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
            }
        }
    }
})

export {theme, errorTheme}