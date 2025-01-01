import React, { useState } from 'react';
import { useUser } from '../service/UserProvider';
import { Navigate } from 'react-router-dom';

export function Login() {
    const { user, login, error } = useUser();
    const [formData, setFormData] = useState({ 
        username: '', 
        password: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    if (user) {
        return <Navigate to='/my_profile' />
    }

    return (
        <div className="main-signup-content">
            <h2>Please log in first</h2>
            <div className="signup-content">
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>Username:</label></td>
                                <td>
                                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Password:</label></td>
                                <td>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {error && <div className="error-message">{error}</div>}
                    <div className="submit-main-content">
                        <div className="submit-content">
                            <button type="submit" className="btn btn-primary signup-button">
                                Log in
                            </button>
                        </div>
                    </div>
                </form>
                <p>
                    Do not have an account? Click&nbsp;
                    <a href="/signup">here</a>
                    &nbsp;to sign up.
                </p>
            </div>
        </div>
    );
}
