import React, { useEffect, useState } from "react";
import Course from "./page_components/Course";
import { fetchItems, deleteCourse } from "../service/CourseAPI";
import { Link } from "react-router-dom";

//renders courseList, allows to create, search, update or delete course
function CourseMenu() {
    const [items, setItems] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        fetchItems((data) => {
            setItems(data);
            setFilteredItems(data);
        }, setError);
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

    const handleSearch = () => {
        if (!courseName.trim()) {
            setFilteredItems(items);
            return;
        }
        const filtered = items.filter((item) =>
            item.courseName.toLowerCase().includes(courseName.toLowerCase())
        );
        console.log(filtered);
        setFilteredItems(filtered);
    };

    const handleInputChange = (e) => {
        setCourseName(e.target.value);
    };

    return (
        <>
            <div className="course-main-content">
                <div className="course-options-content">
                    <Link to="/edit_course" className="btn btn-primary">Create new course</Link>
                    <div className="course-search-content">
                        <input type="text" onChange={handleInputChange} placeholder="Search by course name..."></input>
                        <button type="submit" className="btn btn-primary" onClick={handleSearch}>Search...</button>
                    </div>
                </div>
                {error && <p>{error}</p>}
                <div className="course-container">
                    {
                        filteredItems.map(item => (
                            <Course key={item.courseId} item={item} onDelete={handleDelete} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default CourseMenu; 