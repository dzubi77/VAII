import React, { useState } from "react";
import '../../styles/course_style.css'
import { deleteCourse, fetchItems } from "../../service/CourseAPI";

//represents one courseList item
function Course({ item }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    
    const handleDelete = async(courseName) => {
        if (window.confirm(`Are you sure you want to delete the course "${courseName}"?`)) {
            try {
                await deleteCourse(courseName);
                alert("Course deleted successfully!");
                fetchItems(setItems, setError);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <>
            <div className="course-item-content">
                <h3>{item.courseName}</h3>
                <p>{item.courseDescription}</p>
                <div className="course-item-buttons">
                    <a href='/edit_course' type="button" className="btn btn-warning">Edit course</a>
                    <button type="submit" className="btn btn-danger" onClick={handleDelete}>Delete course</button>
                </div>
            </div>
        </>
    );
}

export default Course;