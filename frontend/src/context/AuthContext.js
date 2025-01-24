import React, { createContext, useState, useEffect } from 'react';
import config from '../config';

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    register: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const { token, user } = await response.json();
            localStorage.setItem('jwt', token);
            setUser(user);
        } catch (error) {
            console.error('Login error:', error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('jwt');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error.message);
            throw error;
        }
    };

    const getUserData = () => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            setUser(null);
            return;
        }

        fetch(`${config.API_BASE_URL}/user/data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return res.json();
            })
            .then((data) => {
                setUser(data.user);
            })
            .catch((err) => {
                console.error('Token verification error:', err.message);
                localStorage.removeItem('jwt');
                setUser(null);
            });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: user,
                login: login,
                logout: logout,
                register: register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
