import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SaveIcon from '@material-ui/icons/Save';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: 'auto',
            height: '100vh',
            width: '50%',
            textAlign: 'center'
        },
        fullWidth: {
            width: '100%',
            maxWidth: '400px',
            display: 'block',
            textAlign: 'center',
            margin: 'auto',
            marginBottom: '10px'
        },
        input: {
            display: 'none'
        },
        hidden: {
            display: 'none'
        },
        videoThumbnail: {
            maxHeight: '250px',
            width: 'auto'
        },
        divContainer: {
            maxHeight: '270px',
            position: 'relative',
            margin: 'auto',
        },
        cancelBtn: {
            position: 'absolute', 
            zIndex: 10, 
            top: 0,
            right: 0
        }
    }),
);

export default function AddImageAnchor() {
    const classes = useStyles();
    const [imageFile, setImageFile] = useState();

    const [imageFileKey, setImageFileKey] = useState();
    const [videoFile, setVideoFile] = useState();
    const [videoFileName, setVideoFileName] = useState();
    const [videoFileKey, setVideoFileKey] = useState();
    const handImageFileChange = (event: any) => {
        setImageFile(URL.createObjectURL(event.target.files[0]));
        console.log();
    }

    const handleVideoFileChange = (event: any) => {
        console.log(videoFile);
        if (videoFile !== null) {
            setVideoFile(event.target.files[0]);
            // const _player: HTMLMediaElement = <HTMLMediaElement>document.getElementById("videoPlayer");
            // if(_player !== null) _player.load();
            // if (v !== null) v.current.load();
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
    console.log(videoFileName)
    return (
        <div className={classes.container} key={'container'}>
            <form noValidate autoComplete="off" 
                action="http://localhost:5000/addAnchor" method="POST" encType="multipart/form-data">

                <TextField name="title" required label="Title" placeholder="Enter title here" variant="outlined" className={classes.fullWidth} fullWidth />

                <TextField name="url" required label="URL" placeholder="Enter your link here" variant="outlined" className={classes.fullWidth} fullWidth />

                <TextField name="description" required label="Description" placeholder="Enter description" variant="outlined" className={classes.fullWidth} fullWidth />

                

                <input accept="image/png, image/jpeg, image/jpg"
                    className={classes.input}
                    id="uploadImages"
                    type="file"
                    name="imageFile"
                    onChange={handImageFileChange}
                    key={imageFileKey || 'im'}
                />
               <label htmlFor="uploadImages" className={classes.fullWidth}>
                    <Button variant="contained" color="primary" component="span" startIcon={<ImageIcon />}>
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

                <input accept="video/mp4, video/m4v, video/mov"
                    className={classes.input} id="uploadVideo"
                    type="file" name="videoFile"
                    onChange={handleVideoFileChange}
                    key={videoFileKey || 'vid'}
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


                <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>Submit</Button>


            </form>

        </div>

    );
}