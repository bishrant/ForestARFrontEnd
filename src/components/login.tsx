import React, { useState } from 'react';
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
import { connect, useDispatch } from 'react-redux';
import { signinUser } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import { showSnackbar } from '../utils/Snackbars';
import { apiPath } from '../utils/config';

const Login = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = formStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const loginUser = (e: any) => {
    e.preventDefault();
    if (form.email !== '' && form.password !== '') {
      api.post(apiPath + 'login', {
        ...form
      }).then((s: any) => {
        if (s.data.success) {
          setError('');
          closeSnackbar();
          dispatch(signinUser(s.data.data));
          history.push("/")
        } else {
          setError(s.data.message);
          showSnackbar(false, enqueueSnackbar, closeSnackbar, s.data.message, null, history);
        }

      })
        .catch((e: any) => {
          showSnackbar(false, enqueueSnackbar, closeSnackbar, 'Login failed. Invalid email and/or password.', null, history);
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5"> Login </Typography>
        {error !== '' && <div className={`${classes.fullWidth} ${classes.error}`}>{error}</div>}
        <ValidatorForm className={classes.form} onSubmit={loginUser} onError={errors => console.log(errors)} >
          <TextValidator label="Email" onChange={handleChange} name="email" variant="outlined" 
            fullWidth value={form.email} validators={['required', 'isEmail']} autoComplete="off" inputProps={{"aria-label":"EMAIL"}}
            errorMessages={['Email is required', 'Email is not valid']} />

          <TextValidator label="Password" type="password" onChange={handleChange}
            name="password" variant="outlined" fullWidth value={form.password} autoComplete="off" inputProps={{"aria-label":"Password"}}
            validators={['required']} errorMessages={['Password is required']} />

          <Button fullWidth variant="contained" color="primary"
            type="submit" className={classes.submit} > Sign In
          </Button>
        </ValidatorForm>

        <Grid container>
          <Grid item xs>
            <Link variant="body2" onClick={() => history.push('/forgotpassword')} className="pointerCursor">
              Forgot password?
                </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" onClick={() => history.push('/register')} className="pointerCursor">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { signinUser })(Login)