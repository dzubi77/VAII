import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../styles/course_style.css';
import { getCourseById } from "../../service/CourseAPI";

const role = localStorage.getItem('role');

export function CourseView({ item, onDelete, isDeleting }) {
    const navigate = useNavigate();
    const [isInstructor, setIsInstructor] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem('role');
        setIsInstructor(role === 'TEACHER'); 
    }, []);

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
                        <button type="button" className="btn btn-primary" onClick={() => handleMoreInfoClick(item)}>More info...</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="course-item-content">
            <h3>{item.courseName}</h3>
            <div className="course-item-buttons">
                <button type="button" className="btn btn-secondary">Join course</button>
                <button type="button" className="btn btn-primary" onClick={() => handleMoreInfoClick(item)}>More information...</button>
            </div>
        </div>
    );
}

export const CourseViewMoreInfo = async (courseId) => {
    const course = await getCourseById(courseId);
    return (
        <>
            <h4>{course.courseName}</h4>
            <h4>{course.courseDescription}</h4>
            <h4>{course.maxStudentCount}</h4>
            <Link to={`/courses`} className="btn btn-primary">Back to courses...</Link>
        </>
    );
}