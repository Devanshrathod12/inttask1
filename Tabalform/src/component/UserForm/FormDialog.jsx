import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ initialData, onSubmit }) {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: '',
    address: '',
    conformaddress: '',
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle  className='bg-pink-200'>User Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the user's information below.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={formData.name || ''}
          onChange={handleChange}
        />
        <TextField
          required
          margin="dense"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={formData.email || ''}
          onChange={handleChange}
        />
        <TextField
          required
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          variant="standard"
          value={formData.phone || ''}
          onChange={handleChange}
        />
        <TextField
          required
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          variant="standard"
          value={formData.address || ''}
          onChange={handleChange}
        />
        <TextField
          required
          margin="dense"
          name="conformaddress"
          label="Confirm Address"
          type="text"
          fullWidth
          variant="standard"
          value={formData.conformaddress || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
