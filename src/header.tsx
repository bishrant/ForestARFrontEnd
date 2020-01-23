import React from 'react';
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from './assets/TFS_White.png';
import { makeStyles } from '@material-ui/core/styles';


const isLoggedIn = () => {
    return true;
}
const headerStyle = makeStyles(theme => ({
    userHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }
}))
const Header = (props: any) => {
    const style = headerStyle();
    const {username} = props;
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid
                    alignItems="center"
                    justify="space-between"
                    container  >
                    <Grid item>
                    <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                       <Link  to="https://tfsweb.tamu.edu"> <img src={logo} height="30" alt="tfs logo"/></Link>
                        <Link to="/" style={{ textDecoration: 'none' }}> <Button >Forest AR</Button></Link>
                        <Link to="/addanchor" style={{ textDecoration: 'none' }}> <Button >Add Anchor</Button></Link>
                        </div>
                    </Grid>

                    <Grid item >
                            {!isLoggedIn() && <div className={style.userHeader}><AccountCircleIcon alignmentBaseline="middle" style={{color:'white'}}/>
                            <Link to="/login" style={{ textDecoration: 'none' }}> <Button > Login </Button> </Link>
                            <Link to="/register" style={{ textDecoration: 'none' }}> <Button > Register </Button> </Link>
                            </div>
                            }
                            {isLoggedIn() && <div className={style.userHeader}>Welcome {username}
                            <Button onClick={props.logout} > Logout </Button>
                             </div>}
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header;