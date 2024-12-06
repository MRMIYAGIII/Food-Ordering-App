import { useTranslation } from 'react-i18next';
import { Box, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { style } from '../../utils/ModelStyles';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPassword from './ForgotPassword';
import { useSelector } from 'react-redux';

function Auth({ redirectToHome = false }) {
  const { t } = useTranslation(); // Initialize the translation hook
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    if (token) {
      if (redirectToHome) {
        navigate('/');
      }
    }
  }, [token, navigate, redirectToHome]);

  const handleOnClose = () => {
    navigate('/'); // Redirect to homepage on modal close
  };

  return (
    <Modal
      onClose={handleOnClose}
      open={['/account/login', '/account/register', '/account/forgot-password'].includes(pathname)} // Only open modal for specific routes
    >
      <Box sx={style}>
        {pathname === '/account/login' && <LoginForm />}
        {pathname === '/account/register' && <RegisterForm />}
        {pathname === '/account/forgot-password' && <ForgotPassword />}
        <p>{t('auth_message')}</p> {/* Example translated text */}
      </Box>
    </Modal>
  );
}

export default Auth;
