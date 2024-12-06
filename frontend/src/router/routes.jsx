import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Root from "./root";
import Home from "../pages/home/Home";
import ResetPassword from "../components/Auth/ResetPassword";  // Ensure correct import
import Auth from "../components/Auth/Auth";
import Cart from "../pages/Cart/Cart";
import Profile from "../pages/Profile/Profile";
import Orders from '../pages/Profile/Orders';
import Favorites from '../pages/Profile/Favorites';
import Address from '../pages/Profile/Address';
import Events from '../pages/Profile/Events';
import UserProfile from '../pages/Profile/UserProfile';
import AdminDashboard from '../pages/Profile/AdminDashboard'; // AdminDashboard component

// PrivateRoute component to check user role
function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  if (user?.role !== 'Admin') {
    return <Navigate to="/profile" />; // Redirect to Profile page if not Admin
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <h1>404: Page Not Found</h1>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/account',
        children: [
          {
            path: 'login',
            element: <Auth redirectToHome={true} />  // Login form
          },
          {
            path: 'register',
            element: <Auth redirectToHome={true} />  // Registration form
          },
          {
            path: 'forgot-password',
            element: <Auth /> // Forgot Password form
          },
          {
            path: 'reset-password', // Correctly define this as a child of /account
            element: <ResetPassword /> // Reset Password form
          }
        ]
      },
      // Profile route with children
      {
        path: '/profile',
        element: <Profile />,
        children: [
          {
            path: '/profile',
            element: <UserProfile />
          },
          {
            path: '/profile/orders',
            element: <Orders />
          },
          {
            path: '/profile/favorites',
            element: <Favorites />
          },
          {
            path: '/profile/address',
            element: <Address />
          },
          {
            path: '/profile/events',
            element: <Events />
          },
          // Admin dashboard protected route
          {
            path: '/profile/admin-dashboard',
            element: (
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            )
          }
        ]
      }
    ]
  }
]);

export default router;
