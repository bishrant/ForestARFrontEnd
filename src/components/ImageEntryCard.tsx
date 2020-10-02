import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia, Button, MuiThemeProvider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { errorTheme } from '../shared/theme';
import { apiPath } from '../utils/config';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: "flex",
    justifyContent: 'space-around',
    padding: '10px',
    marginTop: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
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
    width: '100px',
  },
  cardChildren: {
    flex: 1
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  }
});

const goToUpdate = (history: any, id: any) => {
  history.push("/editanchor/" + id);
}

const ImageCard = (props: any) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Card className={classes.card}  >
      {/* <CardActionArea > */}
        <CardContent className={classes.cardChildren}>

          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.image.title}
          </Typography>
          <CardMedia
            className={classes.media}
            image={apiPath + "public/" + props.image.folderName + "/" + props.image.imageName}
            title={props.image.imageName}
          />
          <Typography variant="body2" component="p">
            {props.image.description}
            <br />
            <a href={props.image.url} target="_blank" rel="noopener noreferrer">{props.image.url}</a>
          </Typography>

          {parseInt(props.image.editable) === 1 && 
          
            <div style={{ display: 'flex', marginTop: '10px' }}>
             
            <Button className={classes.deleteBtn} startIcon={<CreateIcon />} onClick={() => { goToUpdate(history, props.image.id) }} >
              Edit</Button>
            <MuiThemeProvider theme={errorTheme}>
              <Button className={classes.deleteBtn} startIcon={<DeleteIcon />} onClick={() => { props.onDelete(props.image.id) }} >
                Delete</Button>
            </MuiThemeProvider>
            
          </div>
      }<br/>
       Author: {props.image.userEmail}
        </CardContent>
      {/* </CardActionArea> */}


   
    </Card>
  );
}

export default ImageCard;