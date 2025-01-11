import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../styles/course_style.css';

const loggedInUserId = localStorage.getItem('userId');

export function CourseView({ item, onDelete, isDeleting }) {
    const navigate = useNavigate();
    const [isInstructor, setIsInstructor] = useState(false);

    useEffect(() => {
        if (item.instructor && item.instructor.userId === loggedInUserId) {
            setIsInstructor(true);
        } else {
            setIsInstructor(false);
        }
    }, [item]);

    const handleMoreInfoClick = (item) => { 
        navigate(`/course/${item.courseId}`);
    }

    if (isInstructor) {
        return (
            <>
                <div className="course-item-content">
                    <h3>{item.courseName}</h3>
                    <div className="course-item-buttons">
                        <Link to={`/edit_course/${item.courseId}`} className="btn btn-warning">Edit course</Link>
                        <button type="button" className="btn btn-danger" onClick={() => onDelete(item.courseId)} disabled={isDeleting}>Delete course</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleMoreInfoClick(item)}>More information...</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="course-item-content">
            <h3>{item.courseName}</h3>
            <div className="course-item-buttons">
                <Link to={`/edit_course/${item.courseId}`} className="btn btn-secondary">Join course</Link>
                <button type="button" className="btn btn-primary" onClick={() => handleMoreInfoClick(item)}>More information...</button>
            </div>
        </div>
    );
}