import React from "react";
import { useNavigate } from 'react-router-dom';
import FormValidation from '../service/FormValidation';

export function Login() {
    const navigateTo = useNavigate();

    const initialFormData = {
        username: '',
        password: ''
    };

    const validateForm = (formData, setError) => {
        const { username, password } = formData;
        if (!username || !password) {
            setError('Both fields are required!');
            return false;
        }
        setError('');
        return true;
    }

    const submitForm = async(formData) => {
        const user = {
            username: formData.username,
            password: formData.password
        };

        const response = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (response.status === 200) {
            const role = response.text();
            console.log(role);
            localStorage.setItem('role', role);
            navigateTo('/courses');
        }
    }

    const { formData, setFormData, error, handleChange, handleSubmit } = FormValidation(initialFormData, validateForm);

    return (
        <>
            <div className="main-signup-content">
                <h2>Please log in first</h2>
                <div className="signup-content">
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
                        {error && <div className="error-message">{error}</div>}
                    </table>
                    <div className="submit-main-content">
                        <div className="submit-content">
                            <button type="button" className="btn btn-primary signup-button" onClick={(e) => handleSubmit(e, submitForm)}>
                                Log in
                            </button>
                            <p>
                                Do not have an account? Click&nbsp;
                                <a href="/signup">here</a>
                                &nbsp;to sign up.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}