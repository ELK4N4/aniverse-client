import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
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
import { banScheme } from '@aniverse/utils/validations';
import errorMessage from '../../../../errorMessage';

export default function EditBanDialog({removeBan, open, handleClose, ban}) {
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();

    const handleSumbit = async (values) => {
        store.startLoading();
        try {
            const { data } = await api.updateBan(ban._id, {expire: values.expire, reason: values.reason});
            enqueueSnackbar('באן עודכן בהצלחה', {variant: 'success'});
            handleClose();
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const formik = useFormik({ initialValues: { username: ban.user.username, expire: ban.expire, reason: ban.reason},
        validateOnBlur: true,
        onSubmit: handleSumbit,
        validationSchema: banScheme
    });

    return (
        <div>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">עדכון באן</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            משתמש - {ban.user.username}
                        </DialogContentText>
                        <MuiPickersUtilsProvider locale={he} utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                error={formik.touched.expire && formik.errors.expire}
                                helperText={formik.touched.expire && formik.errors.expire}
                                fullWidth
                                margin="dense"
                                id="date-picker-dialog"
                                label="תאריך תפוגה"
                                format="MM/dd/yyyy"
                                name="expire"
                                value={formik.values.expire}
                                onChange={date => formik.setFieldValue('expire', date)}
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
                            שמור
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}