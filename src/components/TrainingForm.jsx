import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';


const TrainingForm = ({ open, handleClose, handleSubmit, training }) => {
    const [formData, setFormData] = useState({
        activity: training ? training.activity : '',
        date: training ? training.date : new Date(),
        duration: training ? training.duration : 0
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleDateChange = (newDate) => {
        setFormData({ ...formData, date: newDate });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="activity"
                    label="Activity"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.activity}
                    onChange={handleChange}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date"
                        inputFormat="MM/dd/yyyy"
                        value={formData.date}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    margin="dense"
                    name="duration"
                    label="Duration (in minutes)"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={formData.duration}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSubmit(formData)}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TrainingForm;
