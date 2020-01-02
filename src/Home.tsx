import React from 'react';
import { Typography, Container, CssBaseline } from '@material-ui/core';
import ImageEntryComp from './ImageEntry';
// import classes from '*.module.css';

const Home = () => {
    return(<div>

      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
          <ImageEntryComp />
        <Typography component="div" style={{height: '100vh' }} />
      </Container>
    </React.Fragment>

    </div>
    )
}
export default Home;