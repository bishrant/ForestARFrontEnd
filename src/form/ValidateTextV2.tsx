import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import "./ValidateText.css";
import { validatorCategory } from './FormUtils';

const ValidateTextV2 = (props: any) => {
  const { onChange, splitView, validators, validatorMsgs, value, ...textFieldProps } = props;
  const split = { ...splitView }
  const isFullWidth = (Object.keys(split).length === 0) ? true : false;
  const [error, setError] = useState<any>({});
  // const [hasError, setHasError] = useState(false)

  const handleChange = (e: any) => {
    let _err = checkForError(e.target.value);
    // setHasError(_err);
    props.onChange(e.target.name, e.target.value, _err);
  }

  const checkForError = (value: any) => {
    const errArray = [];
    const _error = { ...error };
    validators.forEach((k: any, i: any) => {
      const _isValid = validatorCategory[k](value);
      _error[k] = { error: !_isValid, msg: validatorMsgs[i] }
      if (!_isValid) errArray.push(true);

    })
    setError(_error)
    return errArray.length > 0;
  }

  const objTolist = (obj: any) => {
    const out: any = [];
    Object.keys(obj).forEach((o: any) => {
      if (obj[o].error) {
        out.push(obj[o].msg)
      }
    });
    return out
  }

  return <div className={isFullWidth ? 'coverDiv' : 'splitDiv'} >


    <TextField variant="outlined" onChange={handleChange} fullWidth
      {...textFieldProps} rowsMax={5} />
    <div className="errorMsg"> {objTolist(error).map(
      (c: any, k: any) => {
        return (<div key={k}>{c}</div>);
      })}

    </div>

  </div>;

}

// how to implement
{/* <ValidateTextV2 label="Email Address" name="username" value={form.username} onChange={changeFromData} error={form.errors.username}
validators={['required']}  validatorMsgs = {['Email is required']}/>

<ValidateTextV2 label="Password" name="password" value={form.password} onChange={changeFromData} error={form.errors.password}  type="password"
validators={['required']}  validatorMsgs = {['Password is required']}/> */}

export default ValidateTextV2;