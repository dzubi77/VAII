import React from "react";
import Layout from "../components/Layout";

function Login() {
    return (
        <>
            <Layout showTopContainer={false}>
                <div className="login-content">
                    <form>
                        <div className="mb-3 mt-3">
                            <label for="username">Username:</label>
                            <input type="text" className="form-control" id="username" placeholder="email@example.com"></input>
                        </div>
                        <div className="mb-3">
                            <label for="password">Password:</label>
                            <input type="password" className="form-control" id="password"></input>
                        </div>
                    </form>
                    <button className="btn btn-primary">Log in</button>
                    <a href="/">Forgot password?</a>
                    <p>Do not have an account?</p>
                    <a href="/" type="button" className="btn btn-primary">Sign up</a>
                </div>
            </Layout>
        </>
    );
}

export default Login;