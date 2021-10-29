import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { memberScheme } from '@aniverse/utils/validations';
import errorMessage from '../../../../errorMessage';
import AddIconButton from '../../../AddIconButton';

export default function AddAdminDialog({ addAdminToArr }) {
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

    const handleSumbit = async (values) => {
        
        store.startLoading();
        try {
            const { data } = await api.addAdmin(values.username);
            enqueueSnackbar('אדמין נוסף בהצלחה', {variant: 'success'});
            addAdminToArr(data);
            handleClose();
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const formik = useFormik({ initialValues: { username: ''},
        validateOnBlur: true,
        onSubmit: handleSumbit,
        validationSchema: memberScheme
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
                    <DialogTitle id="form-dialog-title">הוספת אדמין</DialogTitle>
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