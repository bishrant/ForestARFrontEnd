import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia, CardActionArea, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: "flex",
    justifyContent: 'space-around'
  
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
      margin: 'auto'
  }
});

const goToUpdate = (history: any, id: any)  => {
  console.log("need to go to ", id)
  history.push("/editanchor/"+ id);
}


const ImageCard = (props: any) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Card className={classes.card}  >
      <CardActionArea onClick={() => { goToUpdate(history, props.image.id)}}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.image.title}
          </Typography>
          <CardMedia
            className={classes.media}
            image={"http://localhost:5000/" + props.image.imageName}
            title="Contemplative Reptile"
          />
          <Typography variant="body2" component="p">
            {props.image.description}
            <br />
            <a href={props.image.url}>{props.image.url}</a>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button variant="outlined" color="primary" 
      className={classes.deleteBtn}
      startIcon={<DeleteIcon />}
      onClick={() => {props.onDelete(props.image.id)}}
      >
      Delete</Button>
    </Card>
  );
}


export default ImageCard;