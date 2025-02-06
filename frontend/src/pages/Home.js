import React from "react";
import '../styles/home_style.css';
import test_image from '../img/sas.png';

function HomePageLeft() {
    return (
        <div className="homepage-left">
            <img src={test_image} alt="sas logo" />
        </div>
    );
}

function HomePageRight() {
    return (
        <div className="homepage-right">
            <p>Welcome to our page! Come inside the amazing world of programming or something like that :D</p>
            <p>
                Click <a href="/courses" className="btn btn-primary">here</a> to join your first course or 
                <a href="/login" className="btn btn-primary">&nbsp; log in</a> to continue learning or teaching.
            </p>
        </div>
    );
}

export function Home() {
    return (
        <div className="homepage-main">
            <HomePageLeft />
            <HomePageRight />
        </div>
    );
}
