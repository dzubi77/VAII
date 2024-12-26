import React, { useState } from "react";
import '../styles/signup_style.css';
import { createUser, getUsers } from "../service/UserAPI";
import { useNavigate } from 'react-router-dom';
import FormValidation from '../service/FormValidation';

export function SignUp() {
    const [nameError, setNameError] = useState('');
    const [pwdError, setPwdError] = useState('');
    const [matchError, setMatchError] = useState('');
    const navigateTo = useNavigate();

    const initialFormData = {
        name: '',
        surname: '',
        username: '',
        password: '',
        confirmPwd: ''
    };

    const checkUsername = async(username) => {
        const users = await getUsers();
        const usernames = users.map((user) => user.username);
        return !usernames.includes(username);
    }

    const validateForm = async (formData, setError) => {
        const { name, surname, username, password, confirmPwd } = formData;
        setNameError('');
        setPwdError('');
        setMatchError('');
    
        if (!username) {
            setNameError('Username is required!');
            return false;
        }
    
        const isUsernameAvailable = await checkUsername(username);
        if (!isUsernameAvailable) {
            setNameError('This username is already used!');
            return false;
        }
    
        if (!password) {
            setPwdError('Password is required!');
            return false;
        }
    
        if (password.length < 8) {
            setPwdError('Password should be at least 8 characters long!');
            return false;
        }
    
        if (password !== confirmPwd) {
            setMatchError('Passwords do not match!');
            return false;
        }
    
        setError('');
        return true;
    };
    

    const { formData, setFormData, error, handleChange, handleSubmit } = FormValidation(initialFormData, validateForm);

    const submitForm = async(formData) => {
        const user = {
            name: formData.name,
            surname: formData.surname,
            username: formData.username,
            password: formData.password,
        };
        await createUser(user);
        alert('New user was created.');
        navigateTo('/login');
    };

    return (
        <>
            <div className="main-signup-content">
                <h2>Please sign up first</h2>
                <div className="signup-content">
                    <table>
                        <tbody>
                            <tr>
                                <td><label>Enter your name:</label></td>
                                <td>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Enter your surname:</label></td>
                                <td>
                                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Choose your username:</label></td>
                                <td>
                                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                                    {nameError && <div className="error-message">{nameError}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td><label>Choose your password:</label></td>
                                <td>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                                    {pwdError && <div className="error-message">{pwdError}</div>}
                                </td>
                            </tr>
                            <tr className="signup-form-content">
                                <td><label>Confirm your password:</label></td>
                                <td>
                                    <input type="password" name="confirmPwd" value={formData.confirmPwd} onChange={handleChange} />
                                    {matchError && <div className="error-message">{matchError}</div>}
                                </td>
                            </tr>
                        </tbody>
                        {error && <div className="error-message">{error}</div>}
                    </table>
                    <div className="submit-main-content">
                        <div className="submit-content">
                            <button type="button" className="btn btn-primary signup-button" onClick={(e) => handleSubmit(e, submitForm)}>
                                Create an account
                            </button>
                            <p>
                                Already have an account? Click&nbsp;
                                <a href="/login">here</a>
                                &nbsp;to log in.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
