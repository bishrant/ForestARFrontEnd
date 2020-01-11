import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import './form.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: null,
    password: null
  })
  const [errors, setErrors] = useState({
    fullName: '',
    password: ''
  });

  const handleChange = (event) => {
    if (!event.isTrusted) return;
    event.preventDefault();
    const { name, value } = event.target;
    console.log(errors.fullName)
    let error = { ...errors };

    switch (name) {
      case 'fullName':
        error.fullName =
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;

      case 'password':
        error.password =
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }
    console.log(error);
    setErrors(error);
    console.log(errors)
    // this.setState({errors, [name]: value});


  }

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <h2>Register</h2>
        <form
          //  onSubmit={this.handleSubmit} 
          noValidate >


          <TextField
            error={errors.fullName.length > 0}
            label="Name"
            defaultValue=""
            helperText={errors.fullName.length > 0 ? errors.fullName : ''}
            variant="outlined"
            onChange={handleChange}
            name='fullName'
            fullWidth
            multiline={true}
            rows={2}
            rowsMax={5}
          />
          <br /><br /> <hr />
          <TextField
            error={errors.password.length > 0}
            label="Password"
            defaultValue=""
            helperText={errors.password}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            name='password'
          />


          <div className='submit'>
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
