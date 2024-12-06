import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Auth from "../components/Auth/Auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

const Root = () => {

    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    // Function to check if token is expired (now outside of useEffect)
    const isTokenExpired = (token) => {
        if (!token) return true; // If no token, consider it expired
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime; // Expired if current time > token expiration
        } catch (error) {
            return true; // If decoding fails, treat as expired
        }
    };

    useEffect(() => {
        // Only proceed if there's a token to check
        if (!token) return;

        if (isTokenExpired(token)) {
            localStorage.removeItem('jwtToken'); // Remove expired token
            toast.error('Session expired, please login again');
            navigate('/account/login'); // Redirect to login page
        }
    }, [token, navigate]); // Dependency on token to re-check when token changes

    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Auth />
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
}

export default Root;
