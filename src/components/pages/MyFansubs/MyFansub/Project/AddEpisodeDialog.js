import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as api from '../../../../../api';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFormik } from 'formik';
import { episodeScheme } from '@aniverse/utils/validations';


const initialState = { number: 1, name: '', link: '' };

export default function AddEpisodeDialog({onSumbit}) {
    const [open, setOpen] = useState(false);
    const [episode, setEpisode] = useState(initialState);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSumbit = (values) => {
        onSumbit(values);
        handleClose();
    }

    const formik = useFormik({ initialValues: initialState,
        validateOnBlur: true,
        onSubmit: handleSumbit,
        validationSchema: episodeScheme
    });

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                הוסף פרק +
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">הוספת פרק</DialogTitle>
                    <Container maxWidth="sm">
                        <DialogContent>
                            <TextField
                                error={formik.touched.number && formik.errors.number}
                                helperText={formik.touched.number && formik.errors.number}
                                onBlur={formik.handleBlur}
                                margin="dense"
                                id="number"
                                label="מספר פרק"
                                type="number"
                                fullWidth
                                autoFocus
                                name="number"
                                value={formik.values.number}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                error={formik.touched.name && formik.errors.name}
                                helperText={formik.touched.name && formik.errors.name}
                                onBlur={formik.handleBlur}
                                margin="dense"
                                id="name"
                                name="name"
                                label="שם פרק"
                                type="text"
                                fullWidth
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                error={formik.touched.link && formik.errors.link}
                                helperText={formik.touched.link && formik.errors.link}
                                onBlur={formik.handleBlur}
                                margin="dense"
                                id="link"
                                name="link"
                                label="קישור לדרייב"
                                type="link"
                                fullWidth
                                value={formik.values.link}
                                onChange={formik.handleChange}
                            />
                        </DialogContent>
                    </Container>
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