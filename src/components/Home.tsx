import React from 'react';
import { Container, CssBaseline, makeStyles, Theme, createStyles } from '@material-ui/core';
import ImageEntryComp from './ImageEntry';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: "relative",
        minHeight: 200
      },
      fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        color: 'white',
        zIndex: 5
      },
    })
  );

  const classes = useStyles();
  const history = useHistory();

  const addAnchor = () => history.push('/addanchor')
  return (<div>
    <React.Fragment>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={addAnchor}>
        <AddIcon />
      </Fab>
      <CssBaseline />
      <Container maxWidth="sm">
        <ImageEntryComp />
      </Container>
    </React.Fragment>
  </div>
  )
}
export default Home;