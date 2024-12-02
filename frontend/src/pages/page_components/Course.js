import React from "react";
import '../../styles/course_style.css'

//represents one courseList item
function Course({ item }) {
    return (
        <>
            <div className="course-item-content">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="course-item-buttons">
                    <a href='/edit_course' type="button" className="btn btn-warning">Edit course</a>
                    <button type="submit" className="btn btn-danger">Delete course</button>
                </div>
            </div>
        </>
    );
}

export default Course;