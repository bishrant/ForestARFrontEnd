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
               
                <Link to="/" color="inherit"> <Button color="secondary">Home</Button></Link>
                <Link to="/addanchor"> <Button color="secondary">Add Anchor</Button></Link>
                <Link to="/addnew"> <Button color="secondary">Add New</Button></Link>

            </Toolbar>
        </AppBar>
    )
}

export default Header;