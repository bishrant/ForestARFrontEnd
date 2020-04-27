import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { useSnackbar } from 'notistack';
import { Container, CssBaseline } from '@material-ui/core';
import formStyles from '../shared/formStyles';
import { showSnackbar } from '../utils/Snackbars';
import { apiPath } from '../utils/config';

const Activate = (props: any) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const token = props.match.params.token;
    const history = useHistory();
    const activateToken = async (token: string) => {
        Axios.post(apiPath + "activate", { token: token })
            .then((r) => {
                const success = r.data.success;
                const msg = success ? 'Successfully verified your email. Please wait for an admin to activate your account' : 'Failed to activate your account. Invalid or expired token';
                showSnackbar(success, enqueueSnackbar, closeSnackbar, msg, '/login', history)
            })
            .catch((e) => {
                showSnackbar(false, enqueueSnackbar, closeSnackbar, "Error. Please try again.", '/login', history)
            })
    }

    useEffect(() => {
        activateToken(token)
        return () => {
            console.log('done')
        };
    }, [])

    const classes = formStyles();
    return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        </div>
    </Container>)
}

export default withRouter(Activate)