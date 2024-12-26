import React from "react";
import '../styles/home_style.css';
import test_image from '../img/sas.png';

//renders home page
export function Home() {
    return (
        <>
            <div className="homepage-main">
                <div className="homepage-left">
                    <img src={test_image} alt="sas logo"/>
                </div>
                <div className="homepage-right">
                    <p>Welcome to our page! Come inside amazing world of programming or something like that :D</p>
                    <p>Click&nbsp; <a href="/courses" type="button" className="btn btn-primary">here</a> to start your first course
                    or <a href="/login" type="button" className="btn btn-primary">log in</a> to continue learning. </p>
                </div>
            </div>
        </>
    );
}