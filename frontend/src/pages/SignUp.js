import React from "react";
import '../styles/signup_style.css'

export function SignUp() {
    return (
        <>
            <div className="main-signup-content">
                <div className="signup-content">
                    <table>
                        <tbody>
                            <tr className="signup-form-content">
                                <td><label htmlFor="username">Choose your username:</label></td>
                                <td><input type="text" id="username" /></td>
                            </tr>
                            <tr className="signup-form-content">
                                <td><label htmlFor="password">Choose your password:</label></td>
                                <td><input type="password" id="password" /></td>
                            </tr>
                            <tr className="signup-form-content">
                                <td><label htmlFor="confirmPassword">Confirm your password:</label></td>
                                <td><input type="password" id="confirmPassword" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="submit-signup-button">
                        <button type="submit" className="btn btn-primary">Create an account</button>
                    </div>
                </div>
                <div>
                    Already have an account? Click&nbsp;
                    <a href="/login">here</a>
                    &nbsp;to log in.
                </div>
            </div>
        </>
    );
}