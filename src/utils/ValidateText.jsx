import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import "../shared/ValidateText.css";

const ValidateText = (props) => {
  const { onChange, splitView, errorMsg, ...textFieldProps } = props;
  const theme = useTheme();
  const split = { ...splitView };
  console.log(textFieldProps.maxLength)
  const isFullWidth = (Object.keys(split).length === 0) ? true : false;
  return <div className={isFullWidth ? 'coverDiv' : 'splitDiv'} theme={theme}>
    <TextField variant="outlined" onChange={props.onChange} fullWidth  {...textFieldProps} 
    inputProps = {{maxLength: textFieldProps.maxLength, "aria-label": textFieldProps.aa}}  rowsMax={5}  />
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