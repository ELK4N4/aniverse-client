import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import TheatersRoundedIcon from '@material-ui/icons/TheatersRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import NoteRoundedIcon from '@material-ui/icons/NoteRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AdminPanelSettingsIcon from '@material-ui/icons/SupervisedUserCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import useStyles from './style';
import Drawer from './Drawer';
import { Avatar, Box, Button, LinearProgress, withStyles, Slide, Zoom } from '@material-ui/core';
import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';

function Header({toggleTheme, themeIcon}) {
  const store = useStore();
  const { userStore } = store;
  const classes = useStyles();


  const menuOptions = [
    {
      name: 'בית',
      page: '/home',
      icon: <HomeRoundedIcon />
    },
    {
      name: 'צפייה',
      page: '/animes',
      icon: <TheatersRoundedIcon />
    },
    {
      name: 'פאנסאבים',
      page: '/fansubs',
      icon: <PeopleAltRoundedIcon/>
    },
    {
      name: 'פוסטים',
      page: '/posts',
      icon: <NoteRoundedIcon/>
    },  
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    handleMenuClose();
    userStore.logout();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        userStore.user
        ?
        <div>
          <MenuItem onClick={handleMenuClose}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>הודעות</p>
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>התראות</p>
          </MenuItem>

          <MenuItem component={Link} to={'/admin'} onClick={handleMenuClose}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <AdminPanelSettingsIcon/>
            </IconButton>
            <p>אדמין פאנל</p>
          </MenuItem>

          <MenuItem component={Link} to={'/my-fansubs'} onClick={handleMenuClose}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <PeopleAltRoundedIcon/>
            </IconButton>
            <p>הפאנסאבים שלי</p>
          </MenuItem>

          <MenuItem component={Link} to={'/user/settings'} onClick={handleMenuClose}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <SettingsIcon/>
            </IconButton>
            <p>הגדרות</p>
          </MenuItem>

          <MenuItem onClick={handleLogout} className={classes.logout}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <ExitToAppRoundedIcon />
            </IconButton>
            <p>התנתק</p>
          </MenuItem>
        </div>
        : (
          <div>
            <MenuItem onClick={handleMenuClose} component={Link} to='/login'>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <VpnKeyRoundedIcon />
            </IconButton>
            <p>כניסה</p>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to='/register'>
              <IconButton aria-label="show 4 new mails" color="inherit">
                  <PersonAddRoundedIcon />
              </IconButton>
              <p>הרשמה</p>
            </MenuItem>
          </div>
        )
      }
    </Menu>
  );

  const NavButton = withStyles((theme) => ({
    root: {
      color: 'white !important',
      backgroundColor: '#da190b',
      margin: theme.spacing(1),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      "&.active": {
        background:'#790e06',
      },
    }
  }))(Button);

  const NavAvatar = withStyles((theme) => ({
    root: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    }
  }))(Avatar);

  const profileIcon = () => {
    if(userStore.user?.user.avatar) {
      return <NavAvatar src={userStore.user.user.avatar} className={classes.avatar} />
    } else {
      return <AccountCircle />
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.menuButton}>
            <Drawer options={menuOptions} />
          </div>

          <IconButton
            color="inherit"
            aria-label="mode"
            onClick={toggleTheme}
          >
            {themeIcon}
          </IconButton>

          <Button
            variant="outlined"
            color="inherit"
            onClick={handleMobileMenuOpen}
            className={classes.button}
            startIcon={profileIcon()}
            endIcon={<ExpandMoreIcon />}
          >
            {userStore.user?.user?.username || 'אורח'}
          </Button>

          <div className={classes.sectionDesktop}>
            {menuOptions.map((option)=> <NavButton key={option.page} startIcon={option.icon} disableElevation component={NavLink}
              to={option.page}>
            {option.name}
            </NavButton>)}
          </div>
          
          
          <div className={classes.grow} />
          <Typography component={Link} to='/' className={classes.title} variant="h6" noWrap>
            Aniverse
          </Typography>
        </Toolbar>
        <LinearProgress hidden={!store.loading}/>
      </AppBar>
      {renderMobileMenu}
      <div className={classes.appBarSpacer}></div>
    </div>
  );
}

export default observer(Header);