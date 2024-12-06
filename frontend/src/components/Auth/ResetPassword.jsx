import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  useEffect(() => {
    const emailParam = params.get('email');
    setEmail(emailParam);
  }, [location]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/reset-password', {
        password,
        confirmPassword
      }, {
        params: { email, token }
      });

      setMessage(response.data.message);
      navigate('/account/login');
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "An error occurred");
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
        Reset Your Password
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: '1.5rem' }}>
        Enter your email, new password, and confirm it below
      </Typography>
      {message && (
        <Typography color={message.includes("do not match") ? "error" : "success"} sx={{ marginBottom: '1rem' }}>
          {message}
        </Typography>
      )}
      <form onSubmit={handlePasswordReset}>
        {/* Email TextField */}
        <TextField
          label="Email"
          variant="filled"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Allow user to type email
          sx={{
            marginBottom: '1.5rem',
            backgroundColor: '#444',
            borderRadius: '4px',
            input: { color: '#fff' },
          }}
        />
        {/* New Password TextField */}
        <TextField
          type="password"
          label="New Password"
          variant="filled"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginBottom: '1.5rem',
            backgroundColor: '#444',
            borderRadius: '4px',
            input: { color: '#fff' },
          }}
        />
        {/* Confirm Password TextField */}
        <TextField
          type="password"
          label="Confirm Password"
          variant="filled"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            marginBottom: '1.5rem',
            backgroundColor: '#444',
            borderRadius: '4px',
            input: { color: '#fff' },
          }}
        />
        {/* Submit Button */}
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
          Reset Password
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: '1.5rem' }}>
        <Button
          sx={{
            color: '#FFA500',
            textDecoration: 'none',
          }}
          onClick={() => navigate('/account/login')}
        >
          Back to Login
        </Button>
      </Typography>
    </Box>
  );
};

export default ResetPassword;
