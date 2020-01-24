import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ConfigContext from '../utils/ConfigContext';
import { api } from '../utils/oauth';
import { useSnackbar } from 'notistack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import formStyles from '../shared/formStyles';
import { connect, useDispatch } from 'react-redux';
import { signinUser } from '../actions/userActions';
import {useSelector } from 'react-redux';

const Login = (props: any) => {
  const dispatch = useDispatch();
  const classes = formStyles();
  const config = useContext(ConfigContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const loginUser = (e: any) => {
    e.preventDefault();
    if (form.email !== '' && form.password !== '') {
      api.post(config.serverURL + 'login', {
        ...form
      }).then((s: any) => {
        setError('');
        closeSnackbar();
        dispatch(signinUser(s.data))
      })
        .catch((e: any) => {
          enqueueSnackbar('Login failed. Invalid email and/or password.', {
            variant: 'error', anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            }
          });
          setError('Login failed. Invalid email and/or password.');
        });
    } else {
      return;
    }
  }

  const handleChange = (event: any) => {
    const email = event.target.value;
    setForm({ ...form, [event.target.name]: email });
  }

  const isLogged = useSelector((state:any) => state.login);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5"> Login </Typography>
        {error !== '' && <div className={`${classes.fullWidth} ${classes.error}`}>{error}</div>}
        <ValidatorForm className={classes.form} onSubmit={loginUser} onError={errors => console.log(errors)} >
          <TextValidator label="Email" onChange={handleChange} name="email" variant="outlined"
            fullWidth value={form.email} validators={['required', 'isEmail']} autoComplete="off"
            errorMessages={['Email is required', 'Email is not valid']} />

          <TextValidator label="Password" type="password" onChange={handleChange}
            name="password" variant="outlined" fullWidth value={form.password} autoComplete="off"
            validators={['required']} errorMessages={['Password is required']} />

          <Button fullWidth variant="contained" color="primary"
            type="submit" className={classes.submit} > Sign In 
          </Button>
        </ValidatorForm>


        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" >
              Forgot password?
                </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
      {isLogged ? "Logged in" : "Logged out"}

    </Container>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { signinUser })(Login)