import React from "react";
import '../../styles/course_style.css'

//represents one courseList item
function Course({ item, onDelete }) {
    return (
        <>
            <div className="course-item-content">
                <h3>{item.courseName}</h3>
                <p>{item.courseDescription}</p>
                <div className="course-item-buttons">
                    <a href='/edit_course' type="button" className="btn btn-warning">Edit course</a>
                    <button type="submit" className="btn btn-danger" onClick={() => onDelete(item.courseId)}>Delete course</button>
                </div>
            </div>
        </>
    );
}

export default Course;