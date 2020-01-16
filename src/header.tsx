import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" >
                    ForestAR
                </Typography>
               
                <Link to="/" color="inherit"> <Button >Home</Button></Link>
                <Link to="/addanchor"> <Button >Add Anchor</Button></Link>
                <Link to="/login"> <Button >Login</Button></Link>

            </Toolbar>
        </AppBar>
    )
}

export default Header;