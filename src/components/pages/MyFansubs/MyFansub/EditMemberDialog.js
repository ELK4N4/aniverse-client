import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import useStyles from './style';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as api from '../../../../api';
import { Box, Chip, Container, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, Tooltip, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores';
import { observer } from 'mobx-react-lite';
import { FANSUB, permissionsTypes } from '../../../../constants/permissionsTypes';
import Zoom from '@material-ui/core/Zoom';
import { toJS } from 'mobx';
import FansubStore from '../../../../stores/FansubStore';




function EditMemberDialog({open, handleClose, member}) {
    const store = useStore();
    const classes = useStyles();
    const { userStore } = store;
    const { fansubStore } = store;
    const { fansubId, projectId } = useParams();
    const [inputs, setInputs] = useState({role: '', permission: ''});
    const [roles, setRoles] = useState(member.roles);
    const [permissions, setPermissions] = useState(member.permissions);
    const [availablePermissions, setAvailablePermissions] = useState([]);

    useEffect(() => {
        setRoles(member.roles);
        setPermissions(member.permissions);
        let helperArr = [];
        for (const type in permissionsTypes) {
            if(![...permissions, inputs.permission].includes(type.toLowerCase())) {
                helperArr.push(type.toLowerCase());
            }
        }
        setAvailablePermissions(helperArr);
    }, [member])

    const handleSubmit = async () => {
        await api.updateMember(fansubId, member.user._id, {roles, permissions})
        handleClose();
    }

    const addRole = (e) => {
        e.preventDefault();
        setRoles([...roles, inputs.role]);
    }

    const addPermission = () => {
        setPermissions([...permissions, inputs.permission]);
        let helperArr = [];
        for (const type in permissionsTypes) {
            if(![...permissions, inputs.permission].includes(type.toLowerCase())) {
                helperArr.push(type.toLowerCase());
            }
        }
        setAvailablePermissions(helperArr);
    }

    const removeMember = (userId) => () => {
        fansubStore.removeMember(userId);
        handleClose();
    };

    const removeRole = (roleToRemove) => () => {
        setRoles((roles) => roles.filter((role) => role !== roleToRemove));
    };

    const removePermission = (permissionToRemove) => () => {
        setPermissions((permissions) => permissions.filter((permission) => permission !== permissionToRemove));
        let helperArr = [];
        for (const type in permissionsTypes) {
            if(!permissions.filter((permission) => permission !== permissionToRemove).includes(type.toLowerCase())) {
                helperArr.push(type.toLowerCase());
            }
        }
        setAvailablePermissions(helperArr);
    };

    const handleChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">ערוך פרטי חבר צוות</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    חבר צוות - {member.user?.username}
                </DialogContentText>
                
                <Typography variant="h6">
                    תפקידים
                </Typography>
                <Divider />
                <Container style={{marginBottom: "10px"}}>
                    <Paper elevation={3} component="form" className={classes.searchPaper} onSubmit={addRole}>
                        <InputBase
                            className={classes.input}
                            placeholder={'תפקיד חדש'}
                            onChange={handleChange}
                            name="role"
                            value={inputs.role}
                        />
                        <IconButton className={classes.iconButton} aria-label="search" type="submit" onClick={addRole}>
                            <AddIcon className={classes.searchIcon} />
                        </IconButton>
                    </Paper>
                    {roles?.map(role => (
                        <Chip
                            label={role}
                            className={classes.chip}
                            onDelete={removeRole(role)}
                        />
                    ))}
                </Container>

                <Typography variant="h6">
                    הרשאות
                </Typography>
                <Divider />
                <Container style={{paddingTop: "20px", marginBottom: "20px"}}>
                    <from className={classes.permissionForm}>
                        <Box component={FormControl} boxShadow={2} className={classes.permissionControl} size="small" variant="outlined">
                            <InputLabel id="demo-simple-select-label">הוסף הרשאה</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChange}
                                name="permission"
                                value={inputs.permission}
                                disabled={availablePermissions.length === 0}
                            >
                                {availablePermissions.map(permission => (
                                    <MenuItem value={permission}>{permissionsTypes[permission.toUpperCase()].text}</MenuItem>
                                ))}

                            </Select>
                        </Box>
                        <Button type="submit" disabled={availablePermissions.length === 0} className={classes.permissionButton} onClick={addPermission} variant="contained" color="primary">
                                הוסף +
                        </Button>
                    </from>
                    {permissions?.map(permission => (
                        <Tooltip title={permissionsTypes[permission.toUpperCase()].tooltip} interactive arrow TransitionComponent={Zoom} placement="top">
                            <Chip
                                label={permissionsTypes[permission.toUpperCase()].text}
                                className={classes.chip}
                                onDelete={removePermission(permission)}
                            />
                        </Tooltip>
                    ))}
                </Container>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                            ביטול
                    </Button>
                    {member?.user?.username !== toJS(userStore.user.user.username) &&
                            <Button fullWidth onClick={removeMember(member.user._id)} variant="outlined" >
                                הסר את {member?.user?.username} מהפאנסאב
                            </Button>
                    }
                    
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                            שמור
                    </Button>
                </DialogActions>

        </Dialog>
    );
}

export default observer(EditMemberDialog);