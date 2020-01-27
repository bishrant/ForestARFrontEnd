import React, { useState, useContext, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ConfigContext from '../utils/ConfigContext';
import { api } from '../utils/oauth';
import { useSnackbar } from 'notistack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import formStyles from '../shared/formStyles';
import { useHistory } from 'react-router-dom';

export default function Forgotpassword() {
    const classes = formStyles();
    const history = useHistory();
    const config = useContext(ConfigContext);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [error, setError] = useState('');
    const [success, setsuccess] = useState(false);
    const [form, setForm] = useState({
        email: ''
    });

    // customized
    const action = newFunction(closeSnackbar, history);

    const registerUser = (e: any) => {
        e.preventDefault();
        if (form.email !== '') {
            api.post(config.serverURL + 'forgotpassword', {
                ...form
            }).then((s: any) => {
                if (s.data.success) {
                    setError('');
                    setsuccess(true);
                    enqueueSnackbar(`Please check your email to reset your password.`, {
                        variant: 'default', anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                        autoHideDuration: 5000,
                        onClose: (c: any) => {
                            history.replace('/');
                        },
                        action
                    });
                } else {
                    throw new Error('no user found')
                }


            }).catch((e: any) => {
                enqueueSnackbar('No user account found for the provided email address. Please try again.', {
                    variant: 'error', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }
                });
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> Reset your password </Typography>

                {error !== '' && <div className={`${classes.fullWidth} ${classes.error}`}>{error}</div>}
                {success === false &&
                    <div>
                        Please enter the email address associated with your account <br></br>
                        <ValidatorForm className={classes.form} onSubmit={registerUser} onError={errors => console.log(errors)}>

                            <TextValidator label="Email" onChange={handleChange} name="email" variant="outlined" fullWidth value={form.email}
                                validators={['required', 'isEmail']} errorMessages={['Email is required', 'Email is not valid']} />

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

function newFunction(closeSnackbar: (key?: string | number | undefined) => void, history: any) {
    return (key: any) => (<Fragment>
        <Button onClick={() => {
            closeSnackbar(key);
            history.replace('/');
        } }>  OK
        </Button>
    </Fragment>);
}
