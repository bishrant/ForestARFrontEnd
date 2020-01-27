import React, { useContext, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import ConfigContext from '../utils/ConfigContext';
import Axios from 'axios';
import { useSnackbar } from 'notistack';
import { Button, Container, CssBaseline } from '@material-ui/core';
import formStyles from '../shared/formStyles';

const Activate = (props: any) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const config = useContext(ConfigContext);
    const token = props.match.params.token;

    const activateToken = async (token: string) => {
        // customized
        const action = (key: any) => (
            <Fragment>
                <Button onClick={() => {
                    closeSnackbar(key);
                    window.location.replace('/')
                }}>
                    OK
          </Button>
            </Fragment>
        );

        Axios.post(config.serverURL+"activate", { token: token })
            .then((r) => {
                console.log(r.data);
                const success = r.data.success;
                if (success) {
                    enqueueSnackbar(`Successfully activated your account. Please login to continue`, {
                        variant: 'default', anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },

                        autoHideDuration: 50000,
                        onClose: (c: any) => {
                            window.location.replace('/login')
                        },
                        action
                    });
                } else {
                    enqueueSnackbar(`Failed to actvate your account. Invalid or expired token`, {
                        variant: 'error', anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },

                        autoHideDuration: 50000,
                        onClose: (c: any) => {
                            window.location.replace('/')
                        },
                        action
                    });
                }
            })
            .catch((e) => {
                console.log(e)
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