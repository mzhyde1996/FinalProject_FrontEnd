import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function CustomerForm({ open, handleClose, handleSubmit, customer }) {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (customer) {
            setFormData({
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: customer.email,
                phone: customer.phone
            });
        }
    }, [customer]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{customer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" name="firstname" label="First Name" type="text" fullWidth variant="outlined" value={formData.firstname} onChange={handleChange} />
                <TextField margin="dense" name="lastname" label="Last Name" type="text" fullWidth variant="outlined" value={formData.lastname} onChange={handleChange} />
                <TextField margin="dense" name="email" label="Email Address" type="email" fullWidth variant="outlined" value={formData.email} onChange={handleChange} />
                <TextField margin="dense" name="phone" label="Phone Number" type="tel" fullWidth variant="outlined" value={formData.phone} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSubmit(formData)}>{customer ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CustomerForm;

