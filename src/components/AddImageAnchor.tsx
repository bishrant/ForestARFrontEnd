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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { apiPath } from '../utils/config';

export default function AddImageAnchor() {
    let { id } = useParams();
    const classes = useStyles();
    const [uploadStatus, setUploadStatus] = useState('');
    const history = useHistory();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [fileNames, setFileNames] = useState<any>({
        imageName: '',
        imageNameBlob: null,
        videoLinkBlob: null,
        videoLink: ''
    });
    const populateForm = (data: any) => {
        const _f = populateEditForm(data, editForm, apiPath + 'public/');
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
            api.post(apiPath + 'getAnchorDetails/', { id: id })
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


        const [errors, isValid] = validateFormOnSubmit(formError, editForm)
        setFormError(errors);
        if (isValid) return;

        setShowbackDrop(true);
        console.log(id);
        const formData = new FormData();
        const files: any = {};
        const d = { ...editForm };
        Object.keys(d).map((keyName, i) => {
            if (keyName === 'imageName' || keyName === 'videoLink') {
                if (fileNames[keyName + 'blob'] !== null && (typeof fileNames[keyName + 'blob'] !== undefined) && fileNames[keyName + 'blob'] !== undefined) {
                    files[keyName] = [fileNames[keyName + 'blob'], fileNames[keyName]]

                }
            } else {
                formData.append(keyName, d[keyName]);
            }
            return null;
        });
        // debugger;
        // need to add those files at the very end of form data so that multer can grab them in order
        Object.keys(files).forEach(fileKey => {
            formData.append(fileKey, files[fileKey][0], files[fileKey][1]);
        })

        const config = { headers: { 'content-type': 'multipart/form-data' } }
        console.log(d);


        api.post(apiPath + "addAnchor", formData, config)
            .then((s: any) => {
                const msg = typeof id === 'undefined' ? "Successfully added new entry" : "Successfully updated entry";
                showSnackbar(true, enqueueSnackbar, closeSnackbar, msg, '/home', history, 500);
                setUploadStatus('successfully updated');
                setShowbackDrop(false);
            })
            .catch((e: any) => {
                showSnackbar(false, enqueueSnackbar, closeSnackbar, "Error uploading. Please try again.", null, history, 1000);
                setUploadStatus("error uploading")
                setShowbackDrop(false);
            })
    }

    const [editForm, setEditForm] = useState<any>({
        title: '',
        description: '',
        url: '',
        imageName: '',
        videoLink: '',
        publicVideoLink: '',
        physicalHeight: '',
        physicalWidth: '',
        sharingText: '\nI found this video by scanning an image with the #ForestAR app developed by @TXForestService. ',
        folderName: ''
    });


    const [formError, setFormError] = useState<any>({
        title: [],
        description: [],
        url: '',
        imageName: [],
        videoLink: [],
        publicVideoLink: '',
        physicalHeight: [],
        physicalWidth: [],
        sharingText: []
    });

    const checkForError = (name: any, target: any) => {
        const value = target.value;
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
            checkForError(_name, e.target);
        }
    }


    const [showbackDrop, setShowbackDrop] = React.useState(false);

    const [isInvalid, setIsInvalid] = useState(false);
    return (
        isInvalid ?
            <Redirect to="/" /> :
            <div>
                <IconButton onClick={() => history.goBack()} aria-label="go back">
                    <ArrowBackIcon />
                </IconButton>

                <div className={classes.container} key={'container'}>


                    <Backdrop className={classes.backdrop} open={showbackDrop} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    {uploadStatus && <div>{uploadStatus}</div>}

                    <form noValidate onSubmit={onFormSubmit} method="POST" encType="multipart/form-data"  >

                        <ValidateText name='title' error={formError.title.length > 0} errorMsg={formError.title} label='Title' value={editForm.title} onChange={handleChanges} aa="title" />
                        <ValidateText rows={3} multiline={true} name='description' error={formError.description.length > 0} errorMsg={formError.description} aa="Description"
                            label='Description' value={editForm.description} onChange={handleChanges} />

                        <ValidateText name='url' error={formError.url.length > 0} errorMsg={formError.url} label='Website to link from video' value={editForm.url} onChange={handleChanges} aa="URL"/>

                        <input accept="image/png, image/jpeg, image/jpg"
                            className={classes.input} id="uploadImages" type="file" name="imageName" onChange={handleChanges}
                            key={editForm.imageName || 'im'} required
                        />
                        <label htmlFor="uploadImages" className={classes.fullWidth}>
                            <MuiThemeProvider theme={formError.imageName.length > 0 ? errorTheme : theme}>
                                <Button component="span" startIcon={<ImageIcon />}>   Upload an image  </Button>
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

                        <br />
                        <div style={{ textAlign: 'center' }}>
                            Images will scan more successfully if the app knows their physical dimensions.  What size do you expect the image to be in its printed form that people will be scanning?
                        <br />
                        </div>

                        <ValidateText name='physicalHeight' type="number" error={formError.physicalHeight.length > 0} errorMsg={formError.physicalHeight} aa="height"
                            label='Print height (in)' splitView="true" value={editForm.physicalHeight} onChange={handleChanges} />


                        <ValidateText name='physicalWidth' type="number" error={formError.physicalWidth.length > 0} errorMsg={formError.physicalWidth} aa="width"
                            label='Print width (in)' splitView="true" value={editForm.physicalWidth} onChange={handleChanges} />

                        <br />
                        <input accept="video/mp4, video/m4v, video/mov" className={classes.input} type="file" name="videoLink" id='uploadVideo'
                            onChange={handleChanges} key={editForm.videoLink || 'vid'} required />

                        <br />
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

                        <ValidateText name='publicVideoLink' error={formError.publicVideoLink.length > 0} errorMsg={formError.publicVideoLink} aa="video link"
                        label='Link to video on Youtube or other publicly accessible domain' value={editForm.publicVideoLink} onChange={handleChanges} /> <br/>

                        <ValidateText rows={3} multiline={true} name='sharingText' error={formError.sharingText.length > 0} errorMsg={formError.sharingText} maxLength={280} type="text"
                        aa="sharing text"
                            label='Text to appear on sharing screens' value={editForm.sharingText} onChange={handleChanges} />
                            <div style={{color: editForm.sharingText.length > 230 ? "orange": "black"}}>{editForm.sharingText.length}/280</div>

                        <br />
                        <div className={classes.fullWidth}>
                            <br /><hr />
                            <Button type="submit" startIcon={<SaveIcon />} >Submit</Button>
                        </div>
                    </form>

                    <br />
                </div>
            </div>
    );
}