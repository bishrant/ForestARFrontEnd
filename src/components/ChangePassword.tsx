import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { api } from '../utils/oauth';
import { useSnackbar } from 'notistack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import formStyles from '../shared/formStyles';
import { useHistory, withRouter } from 'react-router-dom';
import { showSnackbar } from '../utils/Snackbars';

const ResetPassword = (props: any) => {
    const classes = formStyles();
    const history = useHistory();
    const token = props.match.params.token;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [error, setError] = useState('');
    const [success, setsuccess] = useState(false);
    const [form, setForm] = useState({
        oldpassword: '',
        password: '',
        password2: '',
        token: token
    });

    ValidatorForm.addValidationRule('isPasswordMatch', (value: any) => {
        return value === form.password;
    })
    // customized

    const changePassword = (e: any) => {

        e.preventDefault();
        if (form.oldpassword !== '' && form.password !== '' && form.password2 !== '')  {
            api.post('/changepassword', {
                ...form
            }).then((s: any) => {
                if (s.data.success) {
                    setError('');
                    setsuccess(true);
                    showSnackbar(true, enqueueSnackbar, closeSnackbar, 'Successfully changed password. Please login to continue.', '/login', history);
                } else {
                    throw new Error('Failed to change password')
                }
            }).catch((e: any) => {
                showSnackbar(false, enqueueSnackbar, closeSnackbar, 'Failed to change password.', null, history);
                setError('Failed to change password. Please try again.');
            });
        } else {
            return;
        }
    }

    const handleChange = (event: any) => {
        const val = event.target.value;
        setForm({ ...form, [event.target.name]: val });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> Change password </Typography>

                {error !== '' && <div className={`${classes.fullWidth} ${classes.error}`}>{error}</div>}
                {success === false &&
                    <div>
                        <ValidatorForm className={classes.form} onSubmit={changePassword} onError={errors => console.log(errors)}>

                        <TextValidator label="Old Password" type="password" onChange={handleChange} name="oldpassword" variant="outlined" autoComplete="off"
                                fullWidth value={form.oldpassword} validators={['required']} errorMessages={['Old Password is required']} />

                            <TextValidator label="New Password" type="password" onChange={handleChange} name="password" variant="outlined" autoComplete="off"
                                fullWidth value={form.password} validators={['required']} errorMessages={['New password is required']} />

                            <TextValidator label="Confirm new password" type="password" onChange={handleChange} name="password2" variant="outlined" autoComplete="off"
                                fullWidth value={form.password2} validators={['required', 'isPasswordMatch']}
                                errorMessages={['Password is required', 'Password mismatch']} />

                            <Button fullWidth variant="contained" color="primary" type="submit" className={classes.submit}>
                                Change Password
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