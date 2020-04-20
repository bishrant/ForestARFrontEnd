import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { api } from '../utils/oauth';
import { useSnackbar } from 'notistack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import formStyles from '../shared/formStyles';
import { useHistory } from 'react-router-dom';
import {  showSnackbar } from '../utils/Snackbars';
import { apiPath } from '../utils/config';

export default function Register() {
  const classes = formStyles();
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const [success, setsuccess] = useState(false);
  const [form, setForm] = useState({firstName: '', lastName: '', email: '', password: '', password2: ''});

  ValidatorForm.addValidationRule('isPasswordMatch', (value: any) => {
    return value === form.password;
  })

  const registerUser = (e: any) => {
    e.preventDefault();
    if (form.email !== '' && form.password !== '') {
      api.post(apiPath + 'signup', {
        ...form
      }).then((s: any) => {
        console.log(s);
        if (s.data.success) {
          setError('');
          setsuccess(s.data.success);
          showSnackbar(s.data.success, enqueueSnackbar, closeSnackbar, `Please click on the activation link sent to your email ${form.email} to start using your account.`, '/login', history);
        } else {
          throw new Error('Failed '+ s.mesage);
        }
      })
        .catch((e: any) => {
          showSnackbar(false, enqueueSnackbar, closeSnackbar, 'Failed to create an account. Please try again.',null, history);
          setError('Failed to create an account. Please try again. ');
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
        <Typography component="h1" variant="h5"> Register </Typography>

        {error !== '' && <div className={`${classes.fullWidth} ${classes.error}`}>{error}</div>}
        {success === false &&
          <div>
            <ValidatorForm className={classes.form} onSubmit={registerUser} onError={errors => console.log(errors)}>
              <TextValidator label="First Name" onChange={handleChange} name="firstName" variant="outlined"
                fullWidth value={form.firstName} validators={['required']} errorMessages={['First name is required']} />

              <TextValidator label="Last Name" onChange={handleChange} name="lastName" variant="outlined" fullWidth
                value={form.lastName} validators={['required']} errorMessages={['Last name is required']} />

              <TextValidator label="Email" onChange={handleChange} name="email" variant="outlined" fullWidth value={form.email}
                validators={['required', 'isEmail']} errorMessages={['Email is required', 'Email is not valid']} />

              <TextValidator label="Password" type="password" onChange={handleChange} name="password" variant="outlined" autoComplete="off"
                fullWidth value={form.password} validators={['required']} errorMessages={['Password is required']} />

              <TextValidator label="Confirm password" type="password" onChange={handleChange} name="password2" variant="outlined" autoComplete="off"
                fullWidth value={form.password2} validators={['required', 'isPasswordMatch']}
                errorMessages={['Password is required', 'Password mismatch']} />

              <Button fullWidth variant="contained" color="primary" type="submit" className={classes.submit}>
                Sign In
              </Button>
            </ValidatorForm>
            <Fragment>
              <Grid container>

                <Grid item>
                  <Link  variant="body2" onClick={() => history.push('/login')}>
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Fragment>
          </div>
        }

      </div>
    </Container>
  );
}