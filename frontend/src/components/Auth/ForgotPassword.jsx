import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setMessageError('Email is required!');
      setMessageSuccess(null);
    } else {
      try {
        const response = await fetch('http://localhost:8080/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }), // Correct body format
        });

        const data = await response.json(); // Parse the JSON response
        if (response.ok) {
          setMessageSuccess(data.message || 'Password reset link sent successfully!');
          setMessageError(null);
        } else {
          setMessageError(data.error || 'Something went wrong. Please try again.');
          setMessageSuccess(null);
        }
      } catch (error) {
        setMessageError('Network error. Please try again later.');
        setMessageSuccess(null);
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#333',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        maxWidth: '400px',
        margin: 'auto',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Forgot Password?
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: '1.5rem' }}>
        Enter your email to reset your password
      </Typography>
      {messageError && (
        <Typography color="error" sx={{ marginBottom: '1rem' }}>
          {messageError}
        </Typography>
      )}
      {messageSuccess && (
        <Typography color="success" sx={{ marginBottom: '1rem' }}>
          {messageSuccess}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          variant="filled"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            marginBottom: '1.5rem',
            backgroundColor: '#444',
            borderRadius: '4px',
            input: { color: '#fff' },
          }}
        />
        <Button
          type="submit"
          fullWidth
          sx={{
            backgroundColor: '#FFA500',
            color: '#fff',
            padding: '0.8rem',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#cc8400',
            },
          }}
        >
          Submit
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: '1.5rem' }}>
        <Button
          sx={{
            color: '#FFA500',
            textDecoration: 'none',
          }}
          onClick={() => navigate('account/login')} // Navigate to login route
        >
          Back to Login
        </Button>
      </Typography>
    </Box>
  );
};

export default ForgotPassword;
