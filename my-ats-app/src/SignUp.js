import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const SignUp = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    rollNumber: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name || !formData.role || !formData.rollNumber || !formData.phoneNumber) {
      setError('Please fill out all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    // Save user data to local storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(formData);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Simulate successful sign-up and proceed
    localStorage.setItem('currentUser', JSON.stringify(formData));
    onSuccess();
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Create a new account
      </Typography>
      <Box component="form" noValidate>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          variant="outlined"
          fullWidth
          value={formData.role}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="University Roll Number"
          name="rollNumber"
          variant="outlined"
          fullWidth
          value={formData.rollNumber}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          fullWidth
          value={formData.phoneNumber}
          onChange={handleChange}
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth sx={{ mt: 2 }}>
          Create Account
        </Button>
      </Box>
    </div>
  );
};

export default SignUp;


