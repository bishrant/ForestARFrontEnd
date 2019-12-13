import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia, CardActionArea } from '@material-ui/core';

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
  }
});

const ImageCard = (props: any) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.image.title}
          </Typography>
          <CardMedia
            className={classes.media}
            image={"https://txfipdev.tfs.tamu.edu/forestar/" + props.image.imageName}
            title="Contemplative Reptile"
          />
          <Typography variant="body2" component="p">
            {props.image.description}
            <br />
            <a href={props.image.url}>{props.image.url}</a>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


export default ImageCard;