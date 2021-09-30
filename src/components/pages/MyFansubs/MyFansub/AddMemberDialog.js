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
import { useSnackbar } from 'notistack';



export default function AddMemberDialog() {
    const store = useStore();
    const { fansubStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [username, setUserame] = useState('');
    const { fansubId } = useParams();

    const addMember = async (username) => {
        fansubStore.addMember(username,
            () => {
                enqueueSnackbar('חבר צוות נוסף בהצלחה', {variant: 'success'});
                handleClose();
            },
            (error) => {
                enqueueSnackbar(error, {variant: 'error'});
            },
        );
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSumbit = async () => {
        addMember(username);
    }

    const handleChange = (e) => setUserame(e.target.value);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                הוסף חבר +
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">הוספת חבר צוות</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="שם משתמש"
                        type="name"
                        fullWidth
                        value={username}
                        autoFocus
                        name="text"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={handleSumbit} variant="contained" color="primary">
                    הוסף +
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}