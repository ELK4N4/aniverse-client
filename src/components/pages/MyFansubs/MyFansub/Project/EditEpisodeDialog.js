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
import { useParams } from 'react-router-dom';



export default function EpisodeDialog({open, handleClose, onSumbit, currentEditedEpisode}) {
    const [episode, setEpisode] = useState(currentEditedEpisode);
    const { fansubId, projectId } = useParams();

    const handleSumbit = async () => {
        onSumbit(episode);
        handleClose();
    }

    const handleChange = (e) => setEpisode({ ...episode, [e.target.name]: e.target.value });

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">עריכת פרק</DialogTitle>
                <Container maxWidth="sm">
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="number"
                            label="מספר פרק"
                            type="number"
                            fullWidth
                            autoFocus
                            name="number"
                            onChange={handleChange}
                            defaultValue={episode.number}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="שם פרק"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            defaultValue={episode.name}
                        />
                        <TextField
                            margin="dense"
                            id="link"
                            name="link"
                            label="קישור לדרייב"
                            type="link"
                            fullWidth
                            onChange={handleChange}
                            defaultValue={episode.link}
                        />
                        <TextField
                            margin="dense"
                            id="post"
                            name="post"
                            label="פוסט"
                            type="text"
                            fullWidth
                            defaultValue={episode.post}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="image"
                            name="image"
                            label="תמונה"
                            type="link"
                            fullWidth
                            defaultValue={episode.image}
                            onChange={handleChange}
                        />
                    </DialogContent>
                </Container>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={handleSumbit} variant="contained" color="primary" type="submit">
                    שמור
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}