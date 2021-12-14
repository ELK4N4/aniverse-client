import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Link as MuiLink, responsiveFontSizes, withStyles } from '@material-ui/core/';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import { he } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import { useSnackbar } from 'notistack';
import errorMessage from '../../../errorMessage';

export default function FansubDialog({confirmFansub, unconfirmFansub, open, handleClose, fansub}) {
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();

    const handleSumbit = async (values) => {
        store.startLoading();
        try {
            // const { data } = await api.updateBan(ban._id, values);
            enqueueSnackbar('באן עודכן בהצלחה', {variant: 'success'});
            handleClose();
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    return (
        <div>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">אישור פאנסאב</DialogTitle>
                <DialogContent>
                    <Paper elevation={6} style={{padding: 30, paddingTop: 20, marginTop: 10, marginBottom: 10}}>
                        <Typography gutterBottom variant="h6">
                            שם פאנסאב
                        </Typography>
                        <strong>{fansub.name}</strong>
                    </Paper>
                    <Paper elevation={6} style={{padding: 30, paddingTop: 20, marginTop: 10, marginBottom: 10}}>
                        <Typography gutterBottom variant="h6">
                            קישור לאתר
                        </Typography>
                        {fansub.website ?
                            <MuiLink href={fansub.website} target="_blank">
                                {fansub.website}
                            </MuiLink>
                        :
                            <>
                                אין קישור
                            </>
                        }
                    </Paper>
                    <Paper elevation={6} style={{padding: 30, paddingTop: 20, marginBottom: 20}}>
                        <Typography gutterBottom variant="h6">
                            תיאור הפאנסאב
                        </Typography>
                        {fansub.name}
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        ביטול
                    </Button>
                    <Button variant="contained" color="primary" onClick={confirmFansub}>
                        אישור
                    </Button>
                    <Button variant="outlined" color="primary" onClick={unconfirmFansub}>
                        דחייה
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}