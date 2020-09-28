import React, { useState, Fragment, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { api } from '../utils/oauth';
import { useSnackbar } from 'notistack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import formStyles from '../shared/formStyles';
import { useHistory, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { showSnackbar } from '../utils/Snackbars';
import { apiPath } from '../utils/config';

const ResetPassword = (props: any) => {
    const classes = formStyles();
    const history = useHistory();
    const token = props.match.params.token;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        password: '',
        password2: '',
        token: token
    });

    ValidatorForm.addValidationRule('isPasswordMatch', (value: any) => {
        return value === form.password;
    })

    const changePassword = (e: any) => {
        e.preventDefault();
        if (form.password !== '' && form.password2 !== '') {
            api.post(apiPath +'resetpassword', {
                ...form
            }).then((s: any) => {
                const success = s.data.success;
                const msg = success ? 'Successfully changed password, Please login to continue' : 'Failed to reset password'
                showSnackbar(success, enqueueSnackbar, closeSnackbar, msg, '/login', history)
            }).catch((e: any) => {
                const msg = 'Failed to reset password';
                showSnackbar(false, enqueueSnackbar, closeSnackbar, msg, '/login', history)
                setError('No user account found for the provided email address. Please try again.');
            });
        } else {
            return;
        }
    }

    const handleChange = (event: any) => {
        const val = event.target.value;
        setForm({ ...form, [event.target.name]: val });
    }

    useEffect(() => {
        (async function anyFunctionName() {
            Axios.post("/verifyEmailToken", { token: token, type: 'resetpassword' })
                .then((r) => {
                    if (!r.data.success) {
                        showSnackbar(false, enqueueSnackbar, closeSnackbar, "Invalid or expired token.", '/login', history)
                    }
                })
        })();

    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> Please enter your new password </Typography>
                {error !== '' && <div className={`${classes.fullWidth} ${classes.error}`}>{error}</div>}
                {error === '' &&
                    <div>
                        Please enter the email address associated with your account <br></br>
                        <ValidatorForm className={classes.form} onSubmit={changePassword} onError={errors => console.log(errors)}>

                            <TextValidator label="Password" type="password" onChange={handleChange} name="password" variant="outlined" autoComplete="off"
                                fullWidth value={form.password} validators={['required']} errorMessages={['Password is required']} inputProps={{"aria-label":"Password"}}/>

                            <TextValidator label="Confirm password" type="password" onChange={handleChange} name="password2" variant="outlined" autoComplete="off"
                                fullWidth value={form.password2} validators={['required', 'isPasswordMatch']}
                                errorMessages={['Password is required', 'Password mismatch']} inputProps={{"aria-label":"Password 2"}} />
                            <Button fullWidth variant="contained" color="primary" type="submit" className={classes.submit}>
                                Reset Password
                            </Button>
                        </ValidatorForm>
                        <Fragment>

                        </Fragment>
                    </div>
                }

            </div>
        </Container>
    );
}

export default withRouter(ResetPassword);