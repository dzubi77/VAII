import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_API_URL } from './UserAPI';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (formData) => {
        const { username, password } = formData;

        try {
            const response = await fetch(`${USER_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                setError('');
                const data = await response.json();
                const { role, surname, name, userId } = data;
                const userData = { name, surname };
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('role', role);
                localStorage.setItem('userId', userId);
                setUser(userData);
                navigate('/courses');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (error) {
            setError('Invalid username or password!');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, error }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);