import React, { useState, useContext, Fragment, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ConfigContext from '../utils/ConfigContext';
import { api } from '../utils/oauth';
import { useSnackbar } from 'notistack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import formStyles from '../shared/formStyles';
import { useHistory, withRouter } from 'react-router-dom';
import Axios from 'axios';

const ResetPassword = (props: any) => {
    const classes = formStyles();
    const history = useHistory();
    const token = props.match.params.token;
    const config = useContext(ConfigContext);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [error, setError] = useState('');
    const [success, setsuccess] = useState(false);
    const [form, setForm] = useState({
        password: '',
        password2: '',
        token: token
    });

    ValidatorForm.addValidationRule('isPasswordMatch', (value: any) => {
        return value === form.password;
    })
    // customized
    const action = (key: any) => (
        <Fragment>
            <Button onClick={() => {
                closeSnackbar(key);
                history.replace('/');
            }}>
                OK
      </Button>
        </Fragment>
    );

    const changePassword = (e: any) => {

        e.preventDefault();
        if (form.password !== '' && form.password2 !== '') {
            api.post(config.serverURL + 'resetpassword', {
                ...form
            }).then((s: any) => {
                if (s.data.success) {
                    setError('');
                    setsuccess(true);
                    enqueueSnackbar(`Successfully changed password, Please login to continue`, {
                        variant: 'default', anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                        autoHideDuration: 5000,
                        onClose: (c: any) => {
                            history.replace('/login');
                        },
                        action
                    });
                } else {
                    throw new Error('Failed to reset password')
                }


            }).catch((e: any) => {
                enqueueSnackbar('Failed to reset password. Please try again.', {
                    variant: 'error', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }
                });
                setError('Failed to reset password. Please try again.');
            });
        } else {
            return;
        }
    }

    const handleChange = (event: any) => {
        const val = event.target.value;
        setForm({ ...form, [event.target.name]: val });
    }

    const showError = (msg: string, target: string ="/", timeout: number = 50000) => {
        enqueueSnackbar(msg, {
            variant: 'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },

            autoHideDuration: timeout,
            onClose: (c: any) => {
                window.location.replace(target)
            },
            action
        });
        setError('Invalid token');
    }


    useEffect(() => {
        showError("TEST");
        (async function anyFunctionName() {
            Axios.post(config.serverURL + "verifyEmailToken", {token: token, requesttype: 'resetpassword'})
            .then((r) => {
                if (!r.data.success) {
                    showError("invalid or expired token", "/login")
                }
            })
            return () => {
                console.log('done')
            };
        })();

    }, [])

    

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> Please enter your new password </Typography>

                {error !== '' && <div className={`${classes.fullWidth} ${classes.error}`}>{error}</div>}
                {success === false &&
                    <div>
                        Please enter the email address associated with your account <br></br>
                        <ValidatorForm className={classes.form} onSubmit={changePassword} onError={errors => console.log(errors)}>

                            <TextValidator label="Password" type="password" onChange={handleChange} name="password" variant="outlined" autoComplete="off"
                                fullWidth value={form.password} validators={['required']} errorMessages={['Password is required']} />

                            <TextValidator label="Confirm password" type="password" onChange={handleChange} name="password2" variant="outlined" autoComplete="off"
                                fullWidth value={form.password2} validators={['required', 'isPasswordMatch']}
                                errorMessages={['Password is required', 'Password mismatch']} />
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