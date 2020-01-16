import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia, CardActionArea, Button, MuiThemeProvider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { errorTheme } from './Add/theme';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: "flex",
    justifyContent: 'space-around',
    padding: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 210,
    width: "auto",
    backgroundSize: 'contain'
  },
  deleteBtn: {
      maxHeight: '100px',
      margin: 'auto',
      width: '100%',
  }
});

const goToUpdate = (history: any, id: any)  => {
  history.push("/editanchor/"+ id);
}


const ImageCard = (props: any) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Card className={classes.card}  >
      <CardActionArea >
        <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.image.title}
          </Typography>
          <CardMedia
            className={classes.media}
            image={"http://localhost:5000/"+ props.image.folderName+"/" + props.image.imageName}
            title={props.image.imageName}
          />
          <Typography variant="body2" component="p">
            {props.image.description}
            <br />
            <a href={props.image.url}>{props.image.url}</a>
          </Typography>
        </CardContent>
      </CardActionArea>
      <div style={{margin: 'auto'}}>
      <Button  className={classes.deleteBtn} startIcon={<DeleteIcon />} onClick={() => { goToUpdate(history, props.image.id)}} >
      Edit</Button><br/><br/>
      <MuiThemeProvider theme={errorTheme}>
        <Button  className={classes.deleteBtn} startIcon={<DeleteIcon />} onClick={() => {props.onDelete(props.image.id)}} >
      Delete</Button>
    </MuiThemeProvider>      
    </div>
    </Card>
  );
}

export default ImageCard;