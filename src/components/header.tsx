import React from 'react';
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import logo from '../assets/TFS_White.png';
import logoStar from '../assets/logostar.png';
import { makeStyles } from '@material-ui/core/styles';
import { connect, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import "../shared/header.css";

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
    const history = useHistory();
    const user = useSelector((state: any) => state.user);
    const isLoggedIn = () => {
        if (user === null) {
            return false;
        } else {
        return (typeof user.firstName !== 'undefined' && typeof user.token !== 'undefined')
        }
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            <a href="https://tfsweb.tamu.edu" target="_blank" rel="noopener noreferrer"> 
                            <img height="30" alt="tfs logo" id='logoimgLg' src={logo} />
                            <img height="30" alt="tfs logo" id='logoimgSm' src={logoStar} />
                            </a>
                            <Link to="/" style={{ textDecoration: 'none' }}> <Button className='title'>Forest AR</Button></Link>
                            
                        </div>
                    </Grid>

                    <Grid item >
                        {!isLoggedIn() && <div className={style.userHeader}><AccountCircleIcon alignmentBaseline="middle" style={{ color: 'white' }} />
                            <Link to="/login" style={{ textDecoration: 'none' }}> <Button > Login </Button> </Link>
                            <Link to="/register" style={{ textDecoration: 'none' }}> <Button > Register </Button> </Link>
                        </div>
                        }
                        {isLoggedIn() && <div className={style.userHeader}>
                            
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Welcome&nbsp;&nbsp;<AccountCircleIcon></AccountCircleIcon> &nbsp;  {user.firstName} <KeyboardArrowDownIcon/>
                            </Button>
                            <Menu id="simple-menu"  anchorEl={anchorEl}  keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                               
                                <MenuItem onClick={() => {
                                    handleClose();
                                    props.logout(); 
                                    history.push("/login");
                                    }}>Logout</MenuItem>
                                     <MenuItem style={{width: '150px'}}
                                onClick={() => {
                                    handleClose();
                                    history.push("/changepassword")  
                                }}>
                                    
                                    Change Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</MenuItem>
                               
                            </Menu>
                        </div>}
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    )
}


const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { logout })(Header);