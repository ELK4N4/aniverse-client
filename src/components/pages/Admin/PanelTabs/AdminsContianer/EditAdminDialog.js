import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import useStyles from '../style';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as api from '../../../../../api';
import { Box, Chip, Container, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, Tooltip, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../../stores';
import { observer } from 'mobx-react-lite';
import {adminPermissionsTypes} from '../../../../../constants/adminPermissionsTypes';
import Zoom from '@material-ui/core/Zoom';
import { toJS } from 'mobx';
import { useSnackbar } from 'notistack';
import errorMessage from '../../../../../errorMessage';

function EditAdminDialog({removeAdmin, open, handleClose, admin}) {
    const store = useStore();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { userStore } = store;
    const [inputs, setInputs] = useState({role: admin.role, permission: ''});
    const [permissions, setPermissions] = useState(admin.permissions);
    const [availablePermissions, setAvailablePermissions] = useState([]);

    useEffect(() => {
        setInputs({...inputs, role: admin.role});
        setPermissions(admin.permissions);
        const helperArr = [];
        for (const type in adminPermissionsTypes) {
            if(!admin.permissions.includes(type.toLowerCase())) {
                helperArr.push(type.toLowerCase());
            }
        }
        setAvailablePermissions(helperArr);
    }, [admin])

    const handleSubmit = async () => {
        store.startLoading();
        try {
            const { data } = await api.updateAdmin(admin._id, {role: inputs.role, permissions});
            enqueueSnackbar('חבר צוות עודכן', {variant: 'success'});
            handleClose();
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const addPermission = () => {
        setPermissions([...permissions, inputs.permission]);
        let helperArr = [];
        for (const type in adminPermissionsTypes) {
            if(![...permissions, inputs.permission].includes(type.toLowerCase())) {
                helperArr.push(type.toLowerCase());
            }
        }
        setAvailablePermissions(helperArr);
        setInputs({...inputs, permission: ''});
    }

    const removePermission = (permissionToRemove) => () => {
        setPermissions((permissions) => permissions.filter((permission) => permission !== permissionToRemove));
        let helperArr = [];
        for (const type in adminPermissionsTypes) {
            if(!permissions.filter((permission) => permission !== permissionToRemove).includes(type.toLowerCase())) {
                helperArr.push(type.toLowerCase());
            }
        }
        setAvailablePermissions(helperArr);
    };

    const handleChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">ערוך פרטי חבר צוות</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    אדמין - {admin?.username}
                </DialogContentText>
                
                <Typography variant="h6">
                    תפקיד
                </Typography>
                <Divider />
                <Container style={{marginBottom: "10px"}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="role"
                        label="תפקיד"
                        name="role"
                        value={inputs.role}
                        onChange={handleChange}
                    />
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
                                    <MenuItem value={permission}>{adminPermissionsTypes[permission.toUpperCase()].text}</MenuItem>
                                ))}

                            </Select>
                        </Box>
                        <Button type="submit" disabled={availablePermissions.length === 0 || inputs.permission.length === 0} className={classes.permissionButton} onClick={addPermission} variant="contained" color="primary">
                                הוסף +
                        </Button>
                    </from>
                    {permissions?.map(permission => (
                        <Tooltip title={adminPermissionsTypes[permission.toUpperCase()].tooltip} interactive arrow TransitionComponent={Zoom} placement="top">
                            <Chip
                                label={adminPermissionsTypes[permission.toUpperCase()].text}
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
                    {admin?.username !== toJS(userStore.user.user.username) &&
                            <Button fullWidth onClick={removeAdmin(admin._id)} variant="outlined" >
                                הסר את {admin?.username}
                            </Button>
                    }
                    
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                            שמור
                    </Button>
                </DialogActions>

        </Dialog>
    );
}

export default EditAdminDialog;