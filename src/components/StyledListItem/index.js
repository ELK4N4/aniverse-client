import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style';
import { Avatar, Box, Collapse, Fade, Grow, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Typography, withStyles } from '@material-ui/core';

const listItemBannerStyle = (image) => {
    if(image) {
        return {
            backgroundImage: `linear-gradient(to right ,rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('${image}')`,
        };
    } else {
        return null;
    }
}

export default function StyledListItem({ showAvatarText, text, secondaryText, avatar, banner, onClick, controls }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const textMaxWidth = 89 - 6 * controls.length;

    const CustomItemText = withStyles((theme) => ({
        root: {
            color: 'white',
            maxWidth: `${textMaxWidth}%`,
            overflow: 'hidden',
            '&>*': {
                fontSize: theme.typography.h3.fontSize,
                fontWeight: 'bold',
                textShadow: '0px 0px 20px #000000',
                [theme.breakpoints.down('sm')]: {
                    maxWidth: '90%',
                    fontSize: theme.typography.h4.fontSize,
                },
                [theme.breakpoints.down('xs')]: {
                    maxWidth: '70%',
                    fontSize: theme.typography.h5.fontSize,
                },
            }
        },
        primary: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        secondary: {
            textOverflow: 'ellipsis',
            color: 'white',
            fontSize: theme.typography.body1.fontSize,
            fontWeight: 'normal',
            textShadow: '0px 0px 20px #000000',
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.body1.fontSize,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: theme.typography.body2.fontSize,
            },
        }
    }))(ListItemText);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (e, callback) => {
        setAnchorEl(null);
        callback(e);
    };

    function isValidURL(str) {
        var a  = document.createElement('a');
        a.href = str;
        return (a.host && a.host != window.location.host);
     }

    return (
        <ListItem button onClick={onClick} className={classes.listItem} style={listItemBannerStyle(banner)}>
            <div style={{marginLeft: 10}} />
            <ListItemAvatar>
                <Avatar src={isValidURL(avatar) ? avatar : null} className={classes.avatar} >
                    {showAvatarText && 
                        <Typography className={classes.avatarText}>
                            {String(avatar).charAt(0)}
                        </Typography>
                    }
                </Avatar>
            </ListItemAvatar>
            <div className={classes.textMargin} />
            <CustomItemText
                primary={text}
                primaryTypographyProps
                secondary={secondaryText}
            />
            <ListItemSecondaryAction>
                <Box className={classes.controls}>
                    {controls.map((control) => (
                        <IconButton color="primary" aria-label="delete" onClick={(e) => handleMenuClose(e, control.onClick)}>
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
                            <MenuItem onClick={(e) => handleMenuClose(e, control.onClick)}>
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