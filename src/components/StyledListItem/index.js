import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style';
import { Avatar, Box, Collapse, Fade, Grow, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Menu, MenuItem, withStyles } from '@material-ui/core';

const CustomItemText = withStyles((theme) => ({
    root: {
        color: 'white',
        '&>*': {
            fontSize: theme.typography.h3.fontSize,
            fontWeight: 'bold',
            textShadow: '0px 0px 20px #000000',
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.h4.fontSize,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: theme.typography.h5.fontSize,
            },
        }
    },
}))(ListItemText);

const listItemBannerStyle = (image) => {
    if(image) {
        return {
            backgroundImage: `linear-gradient(to right ,rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('${image}')`,
        };
    } else {
        return null;
    }
}

export default function StyledListItem({ text, avatar, banner, onClick, controls }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (callback) => {
        setAnchorEl(null);
        callback();
    };
    //TODO Key
    return (
        <ListItem button onClick={onClick} className={classes.listItem} style={listItemBannerStyle(banner)}>
            <div style={{marginLeft: 10}} />
            <ListItemAvatar>
                <Avatar src={avatar} className={classes.avatar}/>
            </ListItemAvatar>
            <div className={classes.textMargin} />
            <CustomItemText
                primary={text}
            />
            <ListItemSecondaryAction>
                <Box className={classes.controls}>
                    {controls.map((control) => (
                        <IconButton color="primary" aria-label="delete" onClick={() => handleMenuClose(control.onClick)}>
                            {control.icon}
                        </IconButton>
                    ))}
                </Box>
                <Box className={classes.options}>
                    <IconButton
                        id="demo-positioned-button"
                        aria-controls="demo-positioned-menu"
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleMenuOpen} color="primary" aria-label="launch">
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {controls.map(control => (
                            <MenuItem onClick={() => handleMenuClose(control.onClick)}>
                                {control.icon}
                                <p>{control.text}</p>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    )
}