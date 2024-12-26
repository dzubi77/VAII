import React from "react";
import { Link } from "react-router-dom";
import '../../styles/course_style.css';

//represents one courseList item from teacher view
export function Course({ item, onDelete }) {
    return (
        <>
            <div className="course-item-content">
                <h3>{item.courseName}</h3>
                <p>{item.courseDescription}</p>
                <div className="course-item-buttons">
                    <Link to={`/edit_course/${item.courseId}`} className="btn btn-warning">Edit course</Link>
                    <button type="submit" className="btn btn-danger" onClick={() => onDelete(item.courseId)}>Delete course</button>
                </div>
            </div>
        </>
    );
}