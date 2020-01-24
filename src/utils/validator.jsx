import { ValidatorComponent } from 'react-form-validator-core';
import React from 'react';
import TextField from '@material-ui/core/TextField';
/* eslint-enable */

export default class TextValidators extends ValidatorComponent {

    render(props) {
        /* eslint-disable no-unused-vars */
        const {
            error,
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            withRequiredValidator,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <TextField
                {...rest}
                error={!isValid || error}
                helperText={(!isValid && this.getErrorMessage()) || helperText}
            />
        );
    }
}