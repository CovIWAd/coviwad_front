import React, {useCallback} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {keycloak} = useKeycloak();

    const logout = useCallback(() => {
        keycloak.logout();
    }, [keycloak]);

    return (
        <div className={classes.root}>
            <AppBar style={{ background: '#0E1C36'}} position="static">
                <Toolbar >
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
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

                        <MenuItem onClick={handleClose}> <Link to='/documents'>My documents</Link></MenuItem>

                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                       CovIWAd
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
