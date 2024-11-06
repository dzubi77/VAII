import React from "react";
import top_image_path from "../img/sas.png"; //obrazok je len testovaci

function Layout ({children, showTopContainer = true}) {
    return (
        <div className="page-container">
            {showTopContainer && (
                <div className="top-container">
                    <div className="top-inner-container">
                        <img className="image-top" src={top_image_path} alt="sas logo" />
                    </div>
                    <div className="top-inner-container">
                        <p className="top-inner-container-text">Welcome to our course page! Come inside impressive world of programming, learn about modern technologies and much more!</p>
                        <div className="top-inner-container-bottom-text">
                            <br></br>
                            <a className="btn btn-primary button-start" href="/courses">Click here</a> to start your first course
                            <br></br>
                            or <a href="/login">log in</a> to continue learning
                        </div>              
                    </div>
                </div>
            )}
            <div className="main-content-container">
                {children}
            </div>
        </div>
    );
}

export default Layout;