import React from "react";
import Course from "./page_components/Course";

//renders courseList, allows to create, update and delete course
function CourseMenu() {
    const items = [{ id: 1, name:"name", desc:'Description' },
        { id: 2, name:"name", desc:'Description' },
        { id: 3, name:"name", desc:'Description' },
        { id: 4, name:"name", desc:'Description' }
    ];

    return (
        <>
            <div className="course-main-content">
                <h1>Course page //pridavanie kurzov bude neskor mozne az po teacher logine</h1>
                <a href="/edit_course" type="button" className="btn btn-primary">Create new course</a>
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