import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, IconButton, InputLabel, MenuItem, Select, withStyles } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import { he } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { memberScheme } from '@aniverse/utils/validations';
import errorMessage from '../../../../errorMessage';
import AddIconButton from '../../../../components/AddIconButton';

export default function AddBanDialog({ addBanToArr }) {
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

    const [date, setDate] = React.useState(new Date());

    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const handleSumbit = async (values) => {
        store.startLoading();
        try {
            const { data } = await api.addBan(values.username, {expired: values.expired, reason: values.reason});
            enqueueSnackbar('באן נוסף בהצלחה', {variant: 'success'});
            addBanToArr(data);
            handleClose();
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const formik = useFormik({ initialValues: { username: '', expired: new Date(), reason: ''},
        validateOnBlur: true,
        onSubmit: handleSumbit,
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
                    <DialogTitle id="form-dialog-title">הוספת באן</DialogTitle>
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
                        <MuiPickersUtilsProvider locale={he} utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                error={formik.touched.expired && formik.errors.expired}
                                helperText={formik.touched.expired && formik.errors.expired}
                                fullWidth
                                margin="dense"
                                id="date-picker-dialog"
                                label="תאריך תפוגה"
                                format="MM/dd/yyyy"
                                name="expired"
                                value={formik.values.expired}
                                onChange={date => formik.setFieldValue('expired', date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            error={formik.touched.reason && formik.errors.reason}
                            helperText={formik.touched.reason && formik.errors.reason}
                            onBlur={formik.handleBlur}
                            margin="dense"
                            multiline
                            minRows={3}
                            id="reason"
                            label="סיבה"
                            type="reason"
                            fullWidth
                            value={formik.values.reason}
                            name="reason"
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