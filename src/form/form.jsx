import React, { useState } from 'react';
import './form.css';
import TextField from '@material-ui/core/TextField';
import ValidateText from './ValidateText';


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
    setErrors(error);
  }

  const RedDiv = (props) => {
    return <div>Red

      {props.children}
    </div>
  }

  const checkName = (val) => {
    return val.length > 5;
  }

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <h2>Register</h2>
        <form  noValidate >


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
          <RedDiv> Test</RedDiv>
          <ValidateText rows={2} multiline={true} name='fullName' validator={checkName} errorMsg ="Name must be 5 characters" label='Name'/>
           
        </form>
      </div>
    </div>
  );
}
