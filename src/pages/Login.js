import React from "react";
import Layout from "../components/Layout";

function Login() {
    return (
        <>
            <Layout showTopContainer={false}>
                <form className="login-form">
                    <div className="mb-3 mt-3 username-container">
                        <label for="username">Username:</label>
                        <input type="text" className="form-control" id="username" placeholder="email@example.com"></input>
                    </div>
                    <div className="mb-3 password-container">
                        <label for="password">Password:</label>
                        <input type="password" className="form-control" id="password"></input>
                    </div>
                    <button className="btn btn-primary">Log in</button>
                </form>
            </Layout>
        </>
    );
}

export default Login;