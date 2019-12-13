import React from 'react';
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
        }
    }),
);

export default function AddImageAnchor() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <form noValidate autoComplete="off" action="http://localhost:5000/addAnchor" method="POST" encType="multipart/form-data">
                <TextField name="title" required id="filled-required" label="Title" placeholder="Enter title here" variant="outlined" className = {classes.fullWidth} fullWidth/>

                <TextField name="url" required id="filled-required" label="URL" placeholder="Enter your link here" variant="outlined" className = {classes.fullWidth} fullWidth/>

                <input accept="image/*"  className={classes.input}  id="uploadImage" type="file" name="imageFile"   />
                <label htmlFor="uploadImage" className={classes.fullWidth}>
                <Button variant="contained" color="primary" component="span" startIcon={<ImageIcon />}>
                        Upload a image
                </Button>
                </label>

                <input accept="video/mp4, video/m4v, video/mov"  className={classes.input}  id="uploadVideo" type="file" name="videoFile"   />
                <label htmlFor="uploadVideo" className={classes.fullWidth}>
                <Button variant="contained" color="primary" component="span" startIcon={<VideoCallIcon />}>
                        Upload a video
                </Button>
                </label>

                
                <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>Submit</Button>


            </form>
            
        </div>

    );
}