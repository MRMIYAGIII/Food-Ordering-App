import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccounBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogOutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Add Admin icon
import { Divider, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import { useTranslation } from 'react-i18next'; // Import useTranslation

function ProfileNavigation({ open, handleClose }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation(); // Initialize translation hook
    const [path, setPath] = useState('');
    
    const { pathname } = location;
    const user = useSelector((state) => state.auth.user); // Access user from Redux store

    useEffect(() => {
        getPath();
    }, [pathname]);

    const getPath = () => {
        const path = pathname.split('/')[2];
        setPath(path);
    };

    const userRole = user?.role?.replace('ROLE_', '');  // Remove 'ROLE_' prefix from role

    const menu = [
        {
            title: t('orders'), // Translate 'Orders'
            icon: <ShoppingBagIcon />,
        },
        {
            title: t('favorites'), // Translate 'Favorites'
            icon: <FavoriteIcon />,
        },
        {
            title: t('address'), // Translate 'Address'
            icon: <HomeIcon />,
        },
        {
            title: t('payments'), // Translate 'Payments'
            icon: <AccounBalanceWalletIcon />,
        },
        {
            title: t('notifications'), // Translate 'Notifications'
            icon: <NotificationsActiveIcon />,
        },
        {
            title: t('events'), // Translate 'Events'
            icon: <EventIcon />,
        },
        // Conditionally add Admin Dashboard based on user role
        ...(userRole === 'ADMIN' ? [{
            title: t('admin_dashboard'), // Translate 'Admin Dashboard'
            icon: <AdminPanelSettingsIcon />,
            path: '/admin-dashboard',  // Set the path for Admin Dashboard
        }] : []),
        {
            title: t('logout'), // Translate 'Logout'
            icon: <LogOutIcon />,
        },
    ];

    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    const handleNavigate = (title, path) => {
        navigate(`/profile${path}`); // Ensure path is added to the profile base path
    };

    return (
        <div>
            <Drawer open={open} onClose={handleClose} variant={isSmallScreen ? 'temporary' : 'permanent'} anchor="left" sx={{ zIndex: 300 }}>
                <div className="w-[50vw] lg:w-[20vw] h-full flex flex-col justify-center text-xl gap-8 pt-16" style={{ backgroundColor: theme.palette.background.nav }}>
                    {
                        menu.map((item, index) => (
                            <div key={index} onClick={() => handleNavigate(item?.title, item?.path || `/${item?.title.toLowerCase()}`)} className="px-5 flex items-center space-x-5 cursor-pointer" style={path === item?.title?.toLocaleLowerCase() ? { color: 'orange' } : {}}>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                        ))
                    }
                </div>
            </Drawer>
        </div>
    );
}

export default ProfileNavigation;
