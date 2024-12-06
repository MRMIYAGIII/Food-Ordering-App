import React, { useState, useEffect } from 'react';  // Add useEffect here
import { useNavigate } from 'react-router-dom';  // Add useNavigate here
import { useThemeContext } from '../Theme/ThemeContext';
import { useTheme } from '@mui/material/styles';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { token, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  
  const [anchorEl, setAnchorEl] = useState(null); // For language menu
  const openMenu = Boolean(anchorEl);

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = (lang) => {
    if (lang) {
      i18n.changeLanguage(lang); // Change language
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!token && !user) {
      navigate('/account/login');
    } else {
      dispatch(userProfile());
    }
  }, [token, user, dispatch, navigate]);

  return (
    <div className={`w-full h-[80px] lg:px-16 flex sticky top-0 z-50 left-0 justify-between items-center shadow-md px-5`} style={{ backgroundColor: theme.palette.background.nav }}>
      <div onClick={() => navigate("/")} className="flex justify-center lg:gap-3 gap-1 cursor-pointer">
        <FastfoodIcon sx={{ color: theme.palette.primary.main, fontSize: '2.3rem' }} />
        <h1 className="font-dancing text-4xl">{t('app_name')}</h1>
      </div>
      <div className="flex items-center lg:gap-12 gap-3">
        <div className="lg:hidden cursor-pointer" onClick={() => setShowSearch(!showSearch)}>
          <SearchIcon sx={{ fontSize: '2.0rem' }} />
        </div>
        <div className="lg:w-[700px] h-10 rounded-full border-b-[2px] md:hidden sm:hidden lg:block hidden" style={{ borderColor: theme.palette.primary.main }}>
          <input className="w-full h-full rounded-full px-6 border-none" type="text" name="search" placeholder={t('search_placeholder')} />
        </div>
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <LocalMallIcon sx={{ fontSize: '2.0rem' }} />
          <div className="w-[25px] h-[25px] rounded-full absolute -top-[7px] -right-[12px] flex items-center justify-center" style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.default }}>
            <span>1</span>
          </div>
        </div>
        <IconButton onClick={toggleTheme}>
          {mode === "dark" ? <LightModeIcon sx={{ fontSize: '2.0rem' }} /> : <DarkModeIcon sx={{ fontSize: '2.0rem', color: theme.palette.primary.icon }} />}
        </IconButton>
        
        {/* Language Selector */}
        <IconButton onClick={handleLanguageMenuOpen}>
          <LanguageIcon sx={{ fontSize: '2.0rem', color: theme.palette.primary.icon }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleLanguageMenuClose('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageMenuClose('fr')}>Français</MenuItem>
          <MenuItem onClick={() => handleLanguageMenuClose('es')}>Español</MenuItem>
        </Menu>

        {user ? (
          <Avatar onClick={() => navigate("/profile")} sx={{ backgroundColor: theme.palette.primary.main, cursor: 'pointer' }}>{user?.fullName?.charAt(0).toUpperCase()}</Avatar>
        ) : (
          <IconButton onClick={() => navigate("/account/login")}>
            <AccountCircleIcon sx={{ fontSize: '3.0rem', color: theme.palette.primary.main, cursor: 'pointer' }} />
          </IconButton>
        )}
      </div>

      {/* mobile search */}
      <div className={`lg:hidden w-full h-full fixed top-0 left-0 justify-center items-center transition-transform duration-500 ${showSearch ? 'opacity-100 transform translate-y-0 flex' : 'opacity-0 transform -translate-y-full'}`} style={{ backgroundColor: theme.palette.background.nav, opacity: 1, zIndex: 2000 }}>
        <input className="w-[80%] h-[50px] rounded-full px-6 border-[1px]" style={{ zIndex: 3001, color: "#000", borderColor: theme.palette.secondary.main }} type="text" name="search" placeholder={t('search_placeholder')} />
        <CloseIcon className="absolute top-6 right-6 cursor-pointer" sx={{ fontSize: '2.5rem' }} onClick={() => setShowSearch(!showSearch)} />
      </div>
    </div>
  );
};

export default NavBar;
