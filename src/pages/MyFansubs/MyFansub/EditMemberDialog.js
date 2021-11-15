import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import useStyles from './style';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as api from '../../../api';
import { Box, Chip, Container, Divider, FormControl, FormHelperText, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, Tooltip, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { permissionsTypes } from '@aniverse/utils/types';
import Zoom from '@material-ui/core/Zoom';
import { toJS } from 'mobx';
import { useSnackbar } from 'notistack';
import errorMessage from '../../../errorMessage';
import { useFormik } from 'formik';
import { roleAndPermissionsUpdateScheme } from '@aniverse/utils/validations';

function EditMemberDialog({removeMember, open, handleClose, member}) {
    const store = useStore();
    const classes = useStyles();
    const { fansubId } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const { userStore, fansubStore } = store;
    const initialValues = { role: member.role, permissions: member.permissions };
    const [permissions, setPermissions] = useState(member.permissions);
    const [permission, setPermission] = useState('');

    useEffect(() => {
        setPermissions(member.permissions);
    }, [member])

    const availablePermissions = useMemo(() => {
        const helperArr = [];
        for (const type in permissionsTypes.fansub) {
            if(!permissions.includes(type.toLowerCase())) {
                helperArr.push(type.toLowerCase());
            }
        }
        return helperArr
    }, [permissions]);

    const handleSubmit = async (values) => {
        store.startLoading();
        try {
            const { data } = await api.updateMember(fansubId, member.user._id, values);
            enqueueSnackbar('חבר צוות עודכן', {variant: 'success'});
            setPermission('');
            handleClose();
            fansubStore.updateMember(data.user._id, data);
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const formik = useFormik({ initialValues,
        enableReinitialize: true,
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: roleAndPermissionsUpdateScheme
    });

    const handleDialogClose = () => {
        formik.resetForm();
        setPermissions(member.permissions);
        setPermission('');
        handleClose();
    };

    const addPermission = () => {
        const newArr = [...permissions, permission];
        setPermissions(newArr);
        formik.setFieldValue('permissions', newArr);
        let helperArr = [];
        for (const type in permissionsTypes.fansub) {
            if(!newArr.includes(type.toLowerCase())) {
                helperArr.push(type.toLowerCase());
            }
        }
        setPermission('');
    }

    const removePermission = (permissionToRemove) => () => {
        const newArr = permissions.filter((permission) => permission !== permissionToRemove);
        setPermissions(newArr);
        formik.setFieldValue('permissions', newArr);
        let helperArr = [];
        for (const type in permissionsTypes.fansub) {
            if(!permissions.filter((permission) => permission !== permissionToRemove).includes(type.toLowerCase())) {
                helperArr.push(type.toLowerCase());
            }
        }
    };

    const handleSelectChange = (e) => {
        setPermission(e.target.value)
    };

    return (
        <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">ערוך פרטי חבר צוות</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    חבר בפאנסאב - {member?.user.username}
                </DialogContentText>
                <Typography variant="h6">
                    תפקיד
                </Typography>
                <Divider />
                <Container style={{marginBottom: "10px"}}>
                    <TextField
                        error={formik.touched.role && formik.errors.role}
                        helperText={formik.touched.role && formik.errors.role}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="role"
                        label="תפקיד"
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
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
                                onChange={handleSelectChange}
                                name="permission"
                                value={permission}
                                disabled={availablePermissions.length === 0}
                            >
                                {availablePermissions.map(permission => (
                                    <MenuItem value={permission}>{permissionsTypes.fansub[permission.toUpperCase()].text}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Button type="submit" disabled={availablePermissions.length === 0 || permission.length === 0} className={classes.permissionButton} onClick={addPermission} variant="contained" color="primary">
                                הוסף +
                        </Button>
                    </from>
                    {formik.values.permissions?.map(permission => (
                        <Tooltip title={permissionsTypes.fansub[permission.toUpperCase()].tooltip} interactive arrow TransitionComponent={Zoom} placement="top">
                            <Chip
                                label={permissionsTypes.fansub[permission.toUpperCase()].text}
                                className={classes.chip}
                                onDelete={removePermission(permission)}
                            />
                        </Tooltip>
                    ))}
                </Container>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                            ביטול
                    </Button>
                    {member?.user.username !== toJS(userStore.user.user.username) &&
                            <Button fullWidth onClick={() => removeMember(member.user._id)} variant="outlined" >
                                הסר את {member?.user.username}
                            </Button>
                    }
                    
                    <Button type="submit" onClick={formik.handleSubmit} variant="contained" color="primary">
                            שמור
                    </Button>
                </DialogActions>

        </Dialog>
    );
}

export default EditMemberDialog;