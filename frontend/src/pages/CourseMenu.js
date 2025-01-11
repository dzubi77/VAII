import React, { useEffect, useState } from "react";
import { CourseView } from "./page_components/Course";
import { fetchItems, deleteCourse } from "../service/CourseAPI";
import { Link } from "react-router-dom";

export function CourseMenu() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [deletingCourseId, setDeletingCourseId] = useState(null);
    const [error, setError] = useState('');

    const role = localStorage.getItem('role');
    
    useEffect(() => {
        fetchItems((data) => {
            setItems(data);
            setFilteredItems(data);
        }, setError);
    }, []);

    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure you want to delete the course?")) {
            setDeletingCourseId(courseId);
            try {
                await deleteCourse(courseId);
                alert("Course deleted successfully!");
                setItems((prevItems) => prevItems.filter((item) => item.courseId !== courseId));
                setFilteredItems((prevFiltered) => prevFiltered.filter((item) => item.courseId !== courseId));
            } catch (error) {
                setError(error.message);
            } finally {
                setDeletingCourseId(null);
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
        setFilteredItems(filtered);
    };

    const handleInputChange = (e) => {
        setCourseName(e.target.value);
    };

    return (
        <>
            <div className="course-main-content">
                <div className="course-options-content">
                    { 
                        (role === "TEACHER" || role === "ADMIN") && (
                            <Link to="/edit_course" className="btn btn-primary">Create new course</Link>
                        )
                    }
                    <div className="course-search-content">
                        <input type="text" onChange={handleInputChange} placeholder="Search by course name..."/>
                        <button type="submit" className="btn btn-primary" onClick={handleSearch}>Search...</button>
                    </div>
                </div>
                {error && <p>{error}</p>}
                <div className="course-container">
                    {
                        filteredItems.map(item => (
                            <CourseView key={item.courseId} item={item} onDelete={handleDelete} isDeleting={deletingCourseId === item.courseId} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}
