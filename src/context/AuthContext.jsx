import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileService } from '../services/profile/profile.service';
import { userService } from '../services/auth/auth.service';

// Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const [emailForgetPassword, setEmailForgetPassword] = useState("");

    // Check token & restore user on app load
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const access_token = localStorage.getItem('accessToken');
                const refresh_token = localStorage.getItem('refreshToken');
                if (access_token && refresh_token) {
                    const userData = await profileService.getUser();

                    if ("statusCode" in userData) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        navigate("/login");
                        return;
                    }
                    setUser(userData);
                    navigate("/");
                    setIsAuthenticated(true);
                } else {
                    navigate("/login");
                }
            }
            catch (error) {
                console.error('Session restore error:', error);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        };

        restoreSession();
    }, []);

    const signOut = async () => {
        // setIsLoading(true);
        try {
            // Cleanup localStorage session data
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
    };

    // Forgot password
    const forgotPassword = async (email) => {
        setEmailForgetPassword(email);
        // setIsLoading(true);
        // setAuthError(null);
        // try {
        //     const result = await mockAuthApi.forgotPassword(email);
        //     return result;
        // } catch (error) {
        //     const message = error.message || 'Failed to send reset link.';
        //     setAuthError(message);
        //     return { success: false, message };
        // } finally {
        //     setIsLoading(false);
        // }
    };

    //     // Reset password
    //     const resetPassword = async (token, newPassword) => {
    //         setIsLoading(true);
    //         setAuthError(null);
    //         try {
    //             const result = await mockAuthApi.resetPassword(token, newPassword);
    //             // Clear auth state after password reset
    //             setUser(null);
    //             setIsAuthenticated(false);
    //             return result;
    //         } catch (error) {
    //             const message = error.message || 'Password reset failed.';
    //             setAuthError(message);
    //             return { success: false, message };
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    // Verify email
    // const verifyEmail = async (token) => {
    //     setIsLoading(true);
    //     setAuthError(null);
    //     try {
    //         const result = await mockAuthApi.verifyEmail(token);
    //         return result;
    //     } catch (error) {
    //         const message = error.message || 'Email verification failed.';
    //         setAuthError(message);
    //         return { success: false, message };
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const value = {
        isAuthenticated,
        user,
        setUser,
        setIsAuthenticated,
        signOut,

        emailForgetPassword,
        setEmailForgetPassword
        //     signup,
        //     signin,
        //     signout,
        //     // forgotPassword,
        //     // resetPassword,
        //     // verifyEmail,
        //     clearError,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};


// datepart



// thể loại được mượn nhiều lần nhất


// 