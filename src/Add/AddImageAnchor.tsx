import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SaveIcon from '@material-ui/icons/Save';
import ImageIcon from '@material-ui/icons/Image';
import useStyles from './AddImageStyle';
import { useParams } from 'react-router';
import ValidateText from '../form/ValidateText';

import { theme, errorTheme } from './theme';
import { MuiThemeProvider } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {api} from '../oauth';

export default function AddImageAnchor() {
    let { id } = useParams();
    const serverUrl = 'http://localhost:5000/';
    // const id = props.id;
    const classes = useStyles();
    const [uploadStatus, setUploadStatus] = useState();
    const [fileNames, setFileNames] = useState<any>({
        imageName: '',
        imageNameBlob: null,
        videoLinkBlob: null,
        videoLink: ''
    });
    const populateForm = (data: any) => {
        let _f:any = {...editForm};
        _f.title = data.title;
        _f.id = data.id;
        _f.description = data.description;
        _f.url = data.url;
        _f.physicalWidth = data.physicalWidth;
        _f.physicalHeight = data.physicalHeight;
        _f.sharingText = data.sharingText;
        _f.folderName = data.folderName;
        _f.imageName =serverUrl + data.folderName+"/"+ data.imageName;
        _f.videoLink = serverUrl + data.folderName+"/"+ data.videoLink;
        setEditForm(_f);

        setFileNames({
            ...fileNames,
            imageName: data.imageName,
            videoLink: data.videoLink
        })
    }

    useEffect(() => {

        if (typeof id !== 'undefined' && id !== null) {
            api.post(serverUrl +'getAnchorDetails/', {id: id})
                .then((d: any) => {
                    populateForm(d.data[0])
                })
                .catch(() => setIsInvalid(true))
        }
    }, [id])

    const clearInput= (name: any) => {
        setEditForm({...editForm, [name]: ''})
        setFileNames({...fileNames, [name]: ''});
    }

    const onFormSubmit = async (event: any) => {
        event.preventDefault();
        const errors = { ...formError };
        let invalid: boolean[] = [];
        console.log(editForm.imageName);
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
        const serverUrl = "http://localhost:5000/addAnchor";
        const formData = new FormData();
        const d = {...editForm};
        Object.keys(d).map((keyName, i) => {
            if (keyName === 'imageName' || keyName === 'videoLink') {
                if (fileNames[keyName+'blob'] !== null && (typeof fileNames[keyName+'blob'] !== undefined) && fileNames[keyName+'blob'] !== undefined) {
                    console.log(typeof fileNames[keyName+'blob'] === undefined, fileNames[keyName+'blob'] === undefined, keyName+'blob')
                    formData.append(keyName, fileNames[keyName+'blob'], fileNames[keyName])
                }
            } else {
            formData.append(keyName, d[keyName]);
            }
            return null;
        })
        const config = {headers: {'content-type': 'multipart/form-data'}}
        
        api.post(serverUrl, formData, config)
            .then(
                (s: any) => {
                    setUploadStatus("successfully updated");
                }
            )
            .catch((e: any) => {
                setUploadStatus("error uploading")
            })
    }
    const isNull = (val: any) => {
        console.log(val);
        return (typeof val === undefined || val === '');
    }
    const [editForm, setEditForm] = useState<any>({
        title: '',
        description: '',
        url: '',
        imageName: '',
        videoLink: '',
        physicalHeight: '',
        physicalWidth: '',
        sharingText: '',
        folderName: ''
    });

    const requiredValidator = (val: any) => !isNull(val);
    const length10 = (val: any) => val.length > 10;

    const formValidators: any = {
        title: { validator: [requiredValidator, length10], messages: ["Title is required", "Length should be at least 10 characters"] },
        description: { validator: [requiredValidator], messages: ["Description is required"] },
        url: { validator: [requiredValidator], messages: ["URL is required"] },
        imageName: { validator: [requiredValidator], messages: ["Image is required"] },
        videoLink: { validator: [requiredValidator], messages: ["Video is required"] },
        physicalHeight: { validator: [requiredValidator], messages: ["Physical height is required"] },
        physicalWidth: { validator: [requiredValidator], messages: ["Physical width is required"] },
        sharingText: { validator: [requiredValidator], messages: ["Sharing text is required"] }
    }
    const [formError, setFormError] = useState<any>({
        title: [],
        description: [],
        url: '',
        imageName: [],
        videoLink: [],
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
        if (e.target.name === 'imageName' || e.target.name === 'videoLink') {
            const _file = e.target.files[0];
            console.log(_name);
            setEditForm({
                ...editForm,
                [_name]: URL.createObjectURL(_file)
            });
            setFileNames({
                ...fileNames,
                [_name]: _file.name,
                [_name+'blob']: _file
            })
            checkForError(e.target.name, e.target.files[0]);
        } else {
            setEditForm({
                ...editForm,
                [_name]: e.target.value
            });
            checkForError(_name, e.target.value);
        }
    }

    const [isInvalid, setIsInvalid] = useState(false);
    return (
        isInvalid ? 
        <Redirect to="/" /> :
        <div className={classes.container} key={'container'}>
            <div>{uploadStatus}</div>
            <form
                noValidate
                onSubmit={onFormSubmit}
                method="POST"
                encType="multipart/form-data"
                >

                <ValidateText name='title' error={formError.title.length > 0} errorMsg={formError.title} label='Title' value={editForm.title} onChange={handleChanges} />
                <ValidateText rows={3} multiline={true} name='description' error={formError.description.length > 0} errorMsg={formError.description}
                    label='Description' value={editForm.description} onChange={handleChanges} />

                <ValidateText name='url' error={formError.url.length > 0} errorMsg={formError.url} label='URL' value={editForm.url} onChange={handleChanges} />

                <input accept="image/png, image/jpeg, image/jpg" 
                    className={classes.input} id="uploadImages" type="file" name="imageName" onChange={handleChanges}
                    key={editForm.imageName || 'im'} required
                />
                <label htmlFor="uploadImages" className={classes.fullWidth}>
                    <MuiThemeProvider theme={formError.imageName.length > 0 ? errorTheme : theme}>
                        <Button component="span" startIcon={<ImageIcon />}>   Upload a image  </Button>
                        {formError.imageName.length > 0 && <div> Image is required</div>}
                    </MuiThemeProvider>
                </label>

                <div className={classes.divContainer}>
                    <img src={editForm.imageName} alt="img" className={`${classes.videoThumbnail} ${editForm.imageName === '' ? classes.hidden : 'show'}`} />
                    {editForm.imageName !== '' && (
                        <MuiThemeProvider theme={errorTheme}>
                            <Button onClick={() => clearInput('imageName')} className={classes.cancelBtn}>X</Button>
                        </MuiThemeProvider>
                    )}
                </div>

                <ValidateText name='physicalHeight'  type="number" error={formError.physicalHeight.length > 0} errorMsg={formError.physicalHeight} 
                label='Physical height of the image' splitView="true" value={editForm.physicalHeight} onChange={handleChanges} />


                <ValidateText name='physicalWidth'  type="number" error={formError.physicalWidth.length > 0} errorMsg={formError.physicalWidth} 
                label='Physical width of the image' splitView="true" value={editForm.physicalWidth} onChange={handleChanges} />
              

                <input accept="video/mp4, video/m4v, video/mov"  className={classes.input}  type="file" name="videoLink" id='uploadVideo'
                    onChange={handleChanges}  key={editForm.videoLink || 'vid'}  required />

                <label htmlFor="uploadVideo" className={classes.fullWidth}>
                <MuiThemeProvider theme={formError.videoLink.length > 0 ? errorTheme : theme}>
                    <Button component="span" startIcon={<VideoCallIcon />}>
                        Upload a video
                    </Button>
                    {formError.videoLink.length > 0 && <div> Video is required</div>}
                </MuiThemeProvider>
                </label>
                <div className={classes.divContainer}>
                    <div>{<p>Selected: {editForm.videoLink.name}</p> && editForm.videoLink.name}</div>
                    <video controls id="videoPlayer"
                        className={`${classes.videoThumbnail} ${editForm.videoLink === '' ? classes.hidden : 'show'}`}
                        src={editForm.videoLink}>
                    </video>
                    {editForm.videoLink !== '' && (
                        <MuiThemeProvider theme={errorTheme}>
                            <Button onClick={() => clearInput('videoLink')} className={classes.cancelBtn}>X</Button>
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