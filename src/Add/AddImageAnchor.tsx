import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SaveIcon from '@material-ui/icons/Save';
import ImageIcon from '@material-ui/icons/Image';
import axios from 'axios';
import useStyles from './AddImageStyle';
import { IFormData } from './IFormData';
import { useParams } from 'react-router';
import ValidateText from '../form/ValidateText';

export default function AddImageAnchor() {
    let { id } = useParams();
    // const id = props.id;
    const classes = useStyles();
    const [uploadStatus, setUploadStatus] = useState();
    const [form, setForm] = useState<IFormData>({
        id: null,
        title: '',
        url: '',
        description: '',
        imageFile: '',
        videoFile: ''
    })
    const [imageFile, setImageFile] = useState();
    const [imageFileKey, setImageFileKey] = useState();
    const [videoFile, setVideoFile] = useState();
    const [videoFileName, setVideoFileName] = useState();
    const [videoFileKey, setVideoFileKey] = useState();

    useEffect(() => {
        if (typeof id !== 'undefined' && id !== null) {
            console.log(id)
            axios.get('http://localhost:5000/getAnchorDetails/?id=' + id)
                .then((d: any) => {
                    console.log(d);
                    setForm(d.data[0]);
                })
        }
    }, [id])


    // const handleFileChange = (event: any, type: string) 

    const handImageFileChange = (event: any) => {
        console.log(event);
        setForm({
            ...form,
            "imageFile": event.target.files[0]
        })
        setImageFile(URL.createObjectURL(event.target.files[0]));
    }

    const handleVideoFileChange = (event: any) => {
        console.log(videoFile);
        if (videoFile !== null) {
            setVideoFile(event.target.files[0]);
        }
        if (event.target.files.length > 0) {
            setVideoFile(URL.createObjectURL(event.target.files[0]));
        }
        setVideoFileName(event.target.files[0].name);
        console.log(event.target.files[0].name)
    }

    const clearImage = (event: any) => {
        setImageFileKey(Date.now());
        setImageFile(undefined);
        setImageFileKey(undefined)
    }

    const clearVideo = (event: any) => {
        setVideoFileKey(Date.now());
        setVideoFile(undefined);
        setVideoFileName(undefined)
    }

    const handleChange = (event: any) => {
        const _value = event.target.value;
        setForm({
            ...form,
            [event.target.name]: _value
        })
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
        return (typeof val === undefined || val === '');
    }
    const [editForm, setEditForm] = useState<any>({
        title: '',
        description: '',
        url: ''
    });
    const urlValidator = async (url: string) => {
        const r = await axios.get(url).catch((e: any) => { return true })
        return false;
    }
    const requiredValidator = (val: any) => !isNull(val);
    const length10 = (val: any) => val.length > 10;

    const formValidators: any = {
        title: { validator: [requiredValidator, length10], messages: ["Title is required", "Length should be at least 10 characters"] },
        description: { validator: [requiredValidator], messages: ["Description is required"] },
        url: { validator: [requiredValidator], messages: ["URL is required"] },
    }
    const [formError, setFormError] = useState<any>({
        title: [],
        description: [],
        url: ''
    });

    const checkForError = (name: any, value: any) => {
        setFormError({
            ...formError,
            [name]: isNull(value)
        });
        return isNull(value);
    }


    const handleChanges = (e: any) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
        checkForError(e.target.name, e.target.value);
    }

    return (
        <div className={classes.container} key={'container'}>
            <div>{uploadStatus}</div>
            <form
                noValidate
                onSubmit={onFormSubmit}>

                <ValidateText name='title' error={formError.title.length > 0} errorMsg={formError.title} label='Title' value={editForm.title} onChange={handleChanges} />
                <hr />
                <ValidateText rows={3} multiline={true} name='description' error={formError.description.length > 0} errorMsg={formError.description}
                    label='Description' value={editForm.description} onChange={handleChanges} />

                <ValidateText name='url' error={formError.url.length > 0} errorMsg={formError.url} label='URL' value={editForm.url} onChange={handleChanges} />

                <input accept="image/png, image/jpeg, image/jpg"
                    className={classes.input}  id="uploadImages" type="file"  name="imageFile"  onChange={handImageFileChange}
                    key={imageFileKey || 'im'}       required
                />
                <label htmlFor="uploadImages" className={classes.fullWidth}>
                    <Button variant="contained" color="primary" component="span"
                        startIcon={<ImageIcon />}>
                        Upload a image
                    </Button>
                </label>

                <div className={classes.divContainer}>
                    <img src={imageFile}
                        alt="img"
                        className={`${classes.videoThumbnail} ${imageFile === undefined ? classes.hidden : 'show'}`}
                    />
                    {imageFile && (<Button variant="contained" color="primary" onClick={clearImage} className={classes.cancelBtn}>X</Button>)}
                </div>
                <br />
                <div className={classes.fullWidth}>
                    <br /><hr/>
                    <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} >Submit</Button>
                </div>
            </form>

            <br />

            <form autoComplete="off"
                key={uploadStatus || 'form'}
                method="POST"
                encType="multipart/form-data"
                onSubmit={onFormSubmit}
                style={{ display: "none" }}
            >

                <TextField name="description" required label="Enter detailed description about your content."
                    variant="outlined" className={classes.fullWidth} fullWidth
                    onChange={handleChange}
                    multiline={true}
                    rows={2}
                    rowsMax={5}
                />
                <TextField name="sharingText" required label="Text that can be shared by the users."
                    variant="outlined" className={classes.fullWidth} fullWidth
                    onChange={handleChange}
                    multiline={true}
                    rows={2}
                    rowsMax={5}
                />

                <TextField name="physicalHeight" required label="Physical height of printed image in inches."
                    variant="outlined" className={classes.fullWidth} fullWidth
                    onChange={handleChange}
                    type="number"
                />

                <input accept="video/mp4, video/m4v, video/mov"
                    className={classes.input} id="uploadVideo"
                    type="file" name="videoFile"
                    onChange={handleVideoFileChange}
                    key={videoFileKey || 'vid'}
                    required
                />
                <label htmlFor="uploadVideo" className={classes.fullWidth}>
                    <Button variant="contained" color="primary" component="span" startIcon={<VideoCallIcon />}>
                        Upload a video
                    </Button>
                </label>

                <div className={classes.divContainer}>
                    <div>{<p>Selected: {videoFileName}</p> && videoFileName}</div>
                    <video controls id="videoPlayer"
                        className={`${classes.videoThumbnail} ${videoFile === undefined ? classes.hidden : 'show'}`}
                        src={videoFile}>
                    </video>
                    {videoFile && (<Button variant="contained" color="primary" onClick={clearVideo} className={classes.cancelBtn}>X</Button>)}
                </div>
            </form>
        </div>
    );
}