import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SaveIcon from '@material-ui/icons/Save';
import ImageIcon from '@material-ui/icons/Image';
import axios from 'axios';
import useStyles from './AddImageStyle';
import { useParams } from 'react-router';
import ValidateText from '../form/ValidateText';

import { theme, errorTheme } from './theme';
import { MuiThemeProvider } from '@material-ui/core';

export default function AddImageAnchor() {
    let { id } = useParams();
    // const id = props.id;
    const classes = useStyles();
    const [uploadStatus, setUploadStatus] = useState();
    useEffect(() => {
        if (typeof id !== 'undefined' && id !== null) {
            axios.get('http://localhost:5000/getAnchorDetails/?id=' + id)
                .then((d: any) => {
                    console.log(d);
                    // setForm(d.data[0]);
                })
        }
    }, [id])

    const clearInput= (name: any) => {
        setEditForm({...editForm, [name]: ''})
    }

    const onFormSubmit = async (event: any) => {
        event.preventDefault();
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
        setFormError(errors);
        if (invalid.includes(true)) return;
        console.log("need to submit form")
        // const serverUrl = "http://localhost:5000/addAnchor";
        // const formData = new FormData();

        // Object.keys(form).map((keyName, i) => {
        //     formData.append(keyName, form[keyName]);
        //     return null;
        // })
        // const config = {headers: {'content-type': 'multipart/form-data'}}

        // axios.post(serverUrl, formData, config)
        //     .then(
        //         (s: any) => {
        //             setUploadStatus("successfully updated");
        //         }
        //     )
        //     .catch((e: any) => {
        //         setUploadStatus("error uploading")
        //     })
    }
    const isNull = (val: any) => {
        console.log(val);
        return (typeof val === undefined || val === '');
    }
    const [editForm, setEditForm] = useState<any>({
        title: '',
        description: '',
        url: '',
        image: '',
        video: '',
        physicalHeight: '',
        physicalWidth: '',
        sharingText: ''
    });

    const requiredValidator = (val: any) => !isNull(val);
    const length10 = (val: any) => val.length > 10;

    const formValidators: any = {
        title: { validator: [requiredValidator, length10], messages: ["Title is required", "Length should be at least 10 characters"] },
        description: { validator: [requiredValidator], messages: ["Description is required"] },
        url: { validator: [requiredValidator], messages: ["URL is required"] },
        image: { validator: [requiredValidator], messages: ["Image is required"] },
        video: { validator: [requiredValidator], messages: ["Video is required"] },
        physicalHeight: { validator: [requiredValidator], messages: ["Physical height is required"] },
        physicalWidth: { validator: [requiredValidator], messages: ["Physical width is required"] },
        sharingText: { validator: [requiredValidator], messages: ["Sharing text is required"] }
    }
    const [formError, setFormError] = useState<any>({
        title: [],
        description: [],
        url: '',
        image: [],
        video: [],
        physicalHeight: [],
        physicalWidth: [],
        sharingText: []
    });

    const checkForError = (name: any, value: any) => {
        const err = !formValidators[name]['validator'][0](value);
        setFormError({
            ...formError,
            [name]: err ? [formValidators[name]['messages'][0]]: []
        });
    }


    const handleChanges = (e: any) => {
        const _name = e.target.name;
        if (e.target.name === 'image' || e.target.name === 'video') {
            const _file = e.target.files[0];
            setEditForm({
                ...editForm,
                [_name]: URL.createObjectURL(_file)
            });
          
            
            checkForError(e.target.name, e.target.files[0]);
        } else {
            setEditForm({
                ...editForm,
                [_name]: e.target.value
            });
            checkForError(_name, e.target.value);
        }
    }

    return (
        <div className={classes.container} key={'container'}>
            <div>{uploadStatus}</div>
            <form
                noValidate
                onSubmit={onFormSubmit}>

                <ValidateText name='title' error={formError.title.length > 0} errorMsg={formError.title} label='Title' value={editForm.title} onChange={handleChanges} />
                <ValidateText rows={3} multiline={true} name='description' error={formError.description.length > 0} errorMsg={formError.description}
                    label='Description' value={editForm.description} onChange={handleChanges} />

                <ValidateText name='url' error={formError.url.length > 0} errorMsg={formError.url} label='URL' value={editForm.url} onChange={handleChanges} />

                <input accept="image/png, image/jpeg, image/jpg" 
                    className={classes.input} id="uploadImages" type="file" name="image" onChange={handleChanges}
                    key={editForm.image || 'im'} required
                />
                <label htmlFor="uploadImages" className={classes.fullWidth}>
                    <MuiThemeProvider theme={formError.image.length > 0 ? errorTheme : theme}>
                        <Button component="span" startIcon={<ImageIcon />}>   Upload a image  </Button>
                        {formError.image.length > 0 && <div> Image is required</div>}
                    </MuiThemeProvider>
                </label>

                <div className={classes.divContainer}>
                    <img src={editForm.image} alt="img" className={`${classes.videoThumbnail} ${editForm.image === '' ? classes.hidden : 'show'}`} />
                    {editForm.image !== '' && (
                        <MuiThemeProvider theme={errorTheme}>
                            <Button onClick={() => clearInput('image')} className={classes.cancelBtn}>X</Button>
                        </MuiThemeProvider>
                    )}
                </div>

                <ValidateText name='physicalHeight'  type="number" error={formError.physicalHeight.length > 0} errorMsg={formError.physicalHeight} 
                label='Physical height of the image' splitView="true" value={editForm.physicalHeight} onChange={handleChanges} />


                <ValidateText name='physicalWidth'  type="number" error={formError.physicalWidth.length > 0} errorMsg={formError.physicalWidth} 
                label='Physical width of the image' splitView="true" value={editForm.physicalWidth} onChange={handleChanges} />
              

                <input accept="video/mp4, video/m4v, video/mov"  className={classes.input}  type="file" name="video" id='uploadVideo'
                    onChange={handleChanges}  key={editForm.video || 'vid'}  required />

                <label htmlFor="uploadVideo" className={classes.fullWidth}>
                <MuiThemeProvider theme={formError.video.length > 0 ? errorTheme : theme}>
                    <Button component="span" startIcon={<VideoCallIcon />}>
                        Upload a video
                    </Button>
                    {formError.video.length > 0 && <div> Video is required</div>}
                </MuiThemeProvider>
                </label>
                <div className={classes.divContainer}>
                    <div>{<p>Selected: {editForm.video.name}</p> && editForm.video.name}</div>
                    <video controls id="videoPlayer"
                        className={`${classes.videoThumbnail} ${editForm.video === '' ? classes.hidden : 'show'}`}
                        src={editForm.video}>
                    </video>
                    {editForm.video !== '' && (
                        <MuiThemeProvider theme={errorTheme}>
                            <Button onClick={() => clearInput('video')} className={classes.cancelBtn}>X</Button>
                        </MuiThemeProvider>
                    )}
                </div>

                <ValidateText rows={3} multiline={true} name='sharingText' error={formError.sharingText.length > 0} errorMsg={formError.sharingText}
                    label='Text to appear on sharing screens' value={editForm.sharingText} onChange={handleChanges} />

                <br />
                <div className={classes.fullWidth}>
                    <br /><hr />
                    <Button type="submit" startIcon={<SaveIcon />} >Submit</Button>
                </div>
            </form>

            <br />
        </div>
    );
}