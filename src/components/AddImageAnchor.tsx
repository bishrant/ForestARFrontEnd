import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SaveIcon from '@material-ui/icons/Save';
import ImageIcon from '@material-ui/icons/Image';
import useStyles from './AddImageStyle';
import { useParams } from 'react-router';
import ValidateText from '../utils/ValidateText';
import { theme, errorTheme } from '../shared/theme';
import { MuiThemeProvider } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { api } from '../utils/oauth';
import { populateEditForm, formValidators, validateFormOnSubmit } from '../utils/FormUtils';
import { useHistory } from 'react-router-dom';
import { showSnackbar } from '../utils/Snackbars';
import { useSnackbar } from 'notistack';

export default function AddImageAnchor() {
    let { id } = useParams();
    const classes = useStyles();
    const [uploadStatus, setUploadStatus] = useState();
    const history = useHistory();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [fileNames, setFileNames] = useState<any>({
        imageName: '',
        imageNameBlob: null,
        videoLinkBlob: null,
        videoLink: ''
    });
    const populateForm = (data: any) => {
        const _f = populateEditForm(data, editForm);
        console.log(_f);
        setEditForm(_f);
        console.log(editForm)
        setFileNames({
            ...fileNames,
            imageName: data.imageName,
            videoLink: data.videoLink
        })
    }

    useEffect(() => {
        if (typeof id !== 'undefined' && id !== null) {
            api.post('/getAnchorDetails/', { id: id })
                .then((d: any) => {
                    populateForm(d.data[0])
                })
                .catch(() => setIsInvalid(true))
        }
    }, [id])

    const clearInput = (name: any) => {
        setEditForm({ ...editForm, [name]: '' })
        setFileNames({ ...fileNames, [name]: '' });
    }

    const onFormSubmit = async (event: any) => {
        event.preventDefault();
        console.log(id);
        const [errors, isValid] = validateFormOnSubmit(formError, editForm)
        setFormError(errors);
        if (isValid) return;
        const formData = new FormData();
        const d = { ...editForm };
        Object.keys(d).map((keyName, i) => {
            if (keyName === 'imageName' || keyName === 'videoLink') {
                if (fileNames[keyName + 'blob'] !== null && (typeof fileNames[keyName + 'blob'] !== undefined) && fileNames[keyName + 'blob'] !== undefined) {
                    console.log(typeof fileNames[keyName + 'blob'] === undefined, fileNames[keyName + 'blob'] === undefined, keyName + 'blob')
                    formData.append(keyName, fileNames[keyName + 'blob'], fileNames[keyName])
                }
            } else {
                formData.append(keyName, d[keyName]);
            }
            return null;
        })
        const config = { headers: { 'content-type': 'multipart/form-data' } }
        console.log(d)
        api.post("/addAnchor", formData, config)
            .then((s: any) => {
                const msg = typeof id === 'undefined' ? "Successfully added new entry" : "Successfully updated entry";
                showSnackbar(true, enqueueSnackbar, closeSnackbar, msg, '/home', history);
                setUploadStatus("successfully updated");
            })
            .catch((e: any) => {
                showSnackbar(false, enqueueSnackbar, closeSnackbar, "Error uploading. Please try again.", null, history);
                setUploadStatus("error uploading")
            })
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
            [name]: err ? [formValidators[name]['messages'][0]] : []
        });
    }


    const handleChanges = (e: any) => {
        const _name = e.target.name;
        if (_name === 'imageName' || _name === 'videoLink') {
            const _file = e.target.files[0];
            setEditForm({
                ...editForm,
                [_name]: URL.createObjectURL(_file)
            });
            setFileNames({
                ...fileNames,
                [_name]: _file.name,
                [_name + 'blob']: _file
            })
            checkForError(_name, e.target.files[0]);
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
                {uploadStatus && <div>{uploadStatus}</div>}
                <span>Please enter details for a new image anchor </span><br />
                <form noValidate onSubmit={onFormSubmit} method="POST" encType="multipart/form-data"  >

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

                    <ValidateText name='physicalHeight' type="number" error={formError.physicalHeight.length > 0} errorMsg={formError.physicalHeight}
                        label='Print height (in)' splitView="true" value={editForm.physicalHeight} onChange={handleChanges} />


                    <ValidateText name='physicalWidth' type="number" error={formError.physicalWidth.length > 0} errorMsg={formError.physicalWidth}
                        label='Print width (in)' splitView="true" value={editForm.physicalWidth} onChange={handleChanges} />


                    <input accept="video/mp4, video/m4v, video/mov" className={classes.input} type="file" name="videoLink" id='uploadVideo'
                        onChange={handleChanges} key={editForm.videoLink || 'vid'} required />

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