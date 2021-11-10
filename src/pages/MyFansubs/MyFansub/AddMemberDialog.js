import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { FormControl, IconButton, InputLabel, MenuItem, Select, withStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../stores';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { usernameScheme } from '@aniverse/utils/validations';
import AddIconButton from '../../../components/AddIconButton';

export default function AddMemberDialog() {
    const store = useStore();
    const { fansubStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

    const handleSumbit = (values) => {
        fansubStore.addMember(values,
            () => {
                enqueueSnackbar('חבר צוות נוסף בהצלחה', {variant: 'success'});
                handleClose();
            },
            (error) => {
                enqueueSnackbar(error, {variant: 'error'});
            },
        );
    }

    const formik = useFormik({ initialValues: { username: ''},
        validateOnBlur: true,
        onSubmit: handleSumbit,
        validationSchema: usernameScheme
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    return (
        <div>
            <AddIconButton
                aria-label="open drawer"
                onClick={handleOpen}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">הוספת חבר צוות</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={formik.touched.username && formik.errors.username}
                            helperText={formik.touched.username && formik.errors.username}
                            onBlur={formik.handleBlur}
                            margin="dense"
                            id="username"
                            label="שם משתמש"
                            type="username"
                            fullWidth
                            value={formik.values.username}
                            autoFocus
                            name="username"
                            onChange={formik.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            ביטול
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            הוסף +
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}