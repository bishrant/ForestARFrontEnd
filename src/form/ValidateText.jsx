import React from 'react';
import TextField from '@material-ui/core/TextField';
import "./ValidateText.css";
import { useTheme} from '@material-ui/core/styles';

 const ValidateText = (props) => {
    const {onChange, errorMsg, ...textFieldProps} = props;
    const theme = useTheme();
   
    return <div className='coverDiv' theme={theme}>
    <TextField
    variant="outlined"
    onChange={props.onChange}
    fullWidth
    {...textFieldProps}
    rowsMax={5}
  />
    <div className="errorMsg">  
      {errorMsg && 
      errorMsg.map((c, k) => {
        return (<div key={k}>{c}</div>);
      })
    }
      </div>

  </div>;

}

export default ValidateText;