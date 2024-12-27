import React from "react";
import { Link } from "react-router-dom";
import '../../styles/course_style.css';

//represent one courseList item depending on role

export function CourseTeacherView({ item, onDelete }) {
    return (
        <>
            <div className="course-item-content">
                <h3>{item.courseName}</h3>
                <div className="course-item-buttons">
                    <Link to={`/edit_course/${item.courseId}`} className="btn btn-warning">Edit course</Link>
                    <button type="submit" className="btn btn-danger" onClick={() => onDelete(item.courseId)}>Delete course</button>
                </div>
            </div>
        </>
    );
}

export function CourseStudentView({ item }) {
    return (
        <>
            <div className="course-item-content">
                <h3>{item.courseName}</h3>
                <div className="course-item-buttons">
                    <Link to={`/edit_course/${item.courseId}`} className="btn btn-secondary">Join course</Link>
                    <button type="submit" className="btn btn-primary" onClick={() => {}}>More information...</button>
                </div>
            </div>
        </>
    );
}