import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { api } from '../utils/oauth';
import { useSnackbar } from 'notistack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import formStyles from '../shared/formStyles';
import { useHistory } from 'react-router-dom';
import { showSnackbar } from '../utils/Snackbars';
import { apiPath } from '../utils/config';
import useStyles from './AddImageStyle';
import { IconButton, MuiThemeProvider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { theme } from '../shared/theme';

export default function Forgotpassword() {
    const classes = formStyles();
    const history = useHistory();
    const layouts = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [error, setError] = useState('');
    const [form, setForm] = useState({ email: '' });

    const registerUser = (e: any) => {
        e.preventDefault();
        if (form.email !== '') {
            api.post(apiPath + 'forgotpassword', {
                ...form
            }).then((s: any) => {
                const success = s.data.success;
                const target = success ? '/login' : null;
                const msg = success ? 'Please check your email to reset your password' : 'No user account found for the provided email address. Please try again.'
                showSnackbar(success, enqueueSnackbar, closeSnackbar, msg, target, history)
            }).catch((e: any) => {
                console.log(e);
                const msg = 'No user account found for the provided email address. Please try again.';
                showSnackbar(false, enqueueSnackbar, closeSnackbar, msg, null, history)
                setError('No user account found for the provided email address. Please try again.');
            });
        } else {
            return;
        }
    }

    const handleChange = (event: any) => {
        const email = event.target.value;
        setForm({ ...form, [event.target.name]: email });
    }

    return (
        <div>
            <MuiThemeProvider theme={theme}>
            <IconButton onClick={() => history.goBack()} aria-label="go back">
                <ArrowBackIcon />
            </IconButton>
            <CssBaseline />
            <div className={layouts.container}>
                <Typography component="h1" variant="h5"> Reset your password </Typography>
                {error !== '' && <div className={`${classes.fullWidth} ${classes.error}`}>{error}</div>}
                {error === '' &&
                    <div>
                        <span >Please enter the email address associated with your account</span><br></br>
                        <ValidatorForm className={classes.form} onSubmit={registerUser} onError={errors => console.log(errors)}>
                            <TextValidator label="Email" onChange={handleChange} name="email" variant="outlined" fullWidth
                                value={form.email} validators={['required', 'isEmail']} inputProps={{"aria-label":"Email"}}
                                errorMessages={['Email is required', 'Email is not valid']} />

                            <Button fullWidth variant="contained"  className={classes.submit}>
                                Reset Password
                            </Button>
                        </ValidatorForm>
                        <Fragment>

                        </Fragment>
                    </div>
                }

            </div>
            </MuiThemeProvider>
        </div>
    );
}