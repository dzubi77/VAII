import React, { useEffect, useState } from "react";
import Course from "./page_components/Course";
import { fetchItems } from "../service/CourseAPI";

//renders courseList, allows to create, update or delete course
function CourseMenu() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        fetchItems(setItems, setError);
    }, []);

    return (
        <>
            <div className="course-main-content">
                <a href="/edit_course" type="button" className="btn btn-primary">Create new course</a>
                {error && <p>{error}</p>}
                <div className="course-container">
                    {
                        items.map(item => (
                            <Course key={item.id} item={item}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default CourseMenu; 