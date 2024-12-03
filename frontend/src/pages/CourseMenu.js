import React, { useEffect, useState } from "react";
import Course from "./page_components/Course";
import { fetchItems, deleteCourse } from "../service/CourseAPI";

//renders courseList, allows to create, update or delete course
function CourseMenu() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        fetchItems(setItems, setError);
    }, []);

    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure you want to delete the course?")) {
            try {
                await deleteCourse(courseId);
                alert("Course deleted successfully!");
                setItems((prevItems) => prevItems.filter((item) => item.courseId !== courseId));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <>
            <div className="course-main-content">
                <a href="/edit_course" type="button" className="btn btn-primary">Create new course</a>
                {error && <p>{error}</p>}
                <div className="course-container">
                    {
                        items.map(item => (
                            <Course key={item.courseId} item={item} onDelete={handleDelete} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default CourseMenu; 