import React, {useCallback} from 'react';
import {AppBar, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import '../../styles/Navbar.css';

export default function ButtonAppBar() {
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleProfile = () => {
        history.push("/profile");
    };
    const handleHome = () => {
        history.push("/");
    };

    const {keycloak} = useKeycloak();

    const logout = useCallback(() => {
        keycloak.logout();
    }, [keycloak]);

    return (
        <div className={"navbar"}>
            <AppBar style={{ background: '#0E1C36'}} position="static">
                <Toolbar >
                    <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu"
                                onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}> <Link to='/news'>News </Link></MenuItem>

                      {keycloak.authenticated && (
                        <>
                          <MenuItem onClick={handleClose}> <Link to='/documents'>My documents</Link></MenuItem>

                          {/*<MenuItem onClick={logout}>Logout</MenuItem>*/}
                        </>
                        )}


                    </Menu>
                    <Typography variant="h6" className={"title"} onClick={handleHome} style={{cursor: "pointer"}}>
                       CovIWAd
                    </Typography>
                  {keycloak.authenticated && (
                    <div>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="false"
                            onClick={handleProfile}
                            color="inherit"
                        >
                        <AccountCircle />
                        </IconButton>
                    </div>
                  )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
