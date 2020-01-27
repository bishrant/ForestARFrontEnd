import React from 'react';
import { Typography, Container, CssBaseline, Button } from '@material-ui/core';
import ImageEntryComp from './ImageEntry';
import { showErrors } from '../utils/Snackbars';
import { useSnackbar } from 'notistack';


const Home = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (<div>
    <Button onClick={() => {showErrors(enqueueSnackbar, 'sdf')}}>Click</Button>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <ImageEntryComp />
        <Typography component="div" style={{ height: '100vh' }} />
      </Container>
    </React.Fragment>

  </div>
  )
}
export default Home;