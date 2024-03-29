

const populateEditForm = (data: any, editForm: any, basepath : string= 'public/') => {
    let _f: any = { ...editForm };
    _f.folderName = data.folderName;
    _f.title = data.title;
    _f.id = data.id;
    _f.description = data.description;
    _f.url = data.url;
    _f.physicalWidth = data.physicalWidth;
    _f.physicalHeight = data.physicalHeight;
    _f.sharingText = data.sharingText;
    _f.publicVideoLink = data.publicVideoLink;
    _f.imageName = basepath + data.folderName + "/" + data.imageName;
    _f.videoLink = basepath + data.folderName + "/" + data.videoLink;
    return _f;
}

const isNull = (val: any) => {
    return (typeof val === undefined || val === '');
}

const requiredValidator = (val: any) => !isNull(val);
// const length10 = (val: any) => val.length > 10;

const formValidators: any = {
    title: { validator: [requiredValidator], messages: ["Title is required"] },
    description: { validator: [requiredValidator], messages: ["Description is required"] },
    url: { validator: [requiredValidator], messages: ["URL is required"] },
    imageName: { validator: [requiredValidator], messages: ["Image is required"] },
    videoLink: { validator: [requiredValidator], messages: ["Video is required"] },
    publicVideoLink: { validator: [requiredValidator], messages: ["Video link is required"] },
    physicalHeight: { validator: [requiredValidator], messages: ["Physical height is required"] },
    physicalWidth: { validator: [requiredValidator], messages: ["Physical width is required"] },
    sharingText: { validator: [requiredValidator], messages: ["Sharing text is required"] }
}

const validatorCategory: any = {
    required: requiredValidator
}

const validateFormOnSubmit = (formError: any, editForm: any) => {
    const errors = { ...formError };
    let invalid: boolean[] = [];
    for (var idx = 0; idx < Object.keys(formError).length; idx++) {
        const errorsForField: any = [];
        const k = Object.keys(formError)[idx];
        for (var v = 0; v < formValidators[k].validator.length; v++) {
            const validatorFunc = formValidators[k]['validator'][v];
            const isValid = validatorFunc(editForm[k]);
            if (!isValid) {
                errorsForField.push(formValidators[k]['messages'][v])
            }
        }
        errors[k] = errorsForField;
        if (errorsForField.length > 0) invalid.push(true);
    }
    return [errors, invalid.includes(true)];
    // setFormError(errors);
    // if (invalid.includes(true)) return;
}

const checkFormForErrors = (formData: any) => {
    const errList = { ...formData }['errors'];
    console.log(errList);
    Object.keys(errList).forEach((k: any) => {
        if (errList[k]) {
            return true
        }
    })
    return false;
}

export { populateEditForm, formValidators, validateFormOnSubmit, validatorCategory, checkFormForErrors }