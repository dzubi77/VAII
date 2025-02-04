import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { enrollStudent } from "../../service/CourseAPI"; 
import '../../styles/course_style.css';

export const CourseView = ({ item, onDelete, isDeleting }) => {
    const [isInstructor, setIsInstructor] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false); 
    const [enrollmentError, setEnrollmentError] = useState(null); 

    useEffect(() => {
        const role = localStorage.getItem('role');
        setIsInstructor(role === 'TEACHER'); 
    }, []);

    const studentId = localStorage.getItem('userId');

    const handleJoinCourse = async (courseId) => {
        if (!studentId) {
            alert("Student ID is missing!");
            return;
        }

        setIsEnrolling(true);
        setEnrollmentError(null); 
        try {
            await enrollStudent(courseId, studentId); 
            alert("Successfully enrolled in the course!"); 
        } catch (error) {
            setEnrollmentError("Failed to enroll in the course! Please try again.");
        } finally {
            setIsEnrolling(false);
        }
    };

    if (isInstructor) {
        return (
            <div className="course-item-content">
                <h3>{item.courseName}</h3>
                <div className="course-item-buttons">
                    <Link to={`/edit_course/${item.courseId}`} className="btn btn-warning">Edit course</Link>
                    <button type="button" className="btn btn-danger" onClick={() => onDelete(item.courseId)} disabled={isDeleting}>Delete course</button>
                    <button type="button" className="btn btn-primary">More info...</button>
                </div>
            </div>
        );
    }

    return (
        <div className="course-item-content">
            <h3>{item.courseName}</h3>
            <div className="course-item-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => handleJoinCourse(item.courseId)} disabled={isEnrolling}>
                {isEnrolling ? "Enrolling..." : "Join course"}
                </button>
                <button type="button" className="btn btn-primary">More information...</button>
            </div>
            {enrollmentError && <p className="error-message">{enrollmentError}</p>} 
        </div>
    );
}