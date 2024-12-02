import React, { useState } from "react";
import '../../styles/course_style.css'
import { addCourse } from "../../service/CourseAPI";

//form for creating new/editing old course
//todo: validate form (check input) and save to db (then redirect to coursePage)
function EditCourse() {
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        maxStudentCount: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const course = {
            name: formData.name,
            description: formData.description,
            maxStudentCount: parseInt(formData.maxStudentCount, 10), // Convert to number
          };
          console.log(course.name + " " + course.description);
        const response = await addCourse(course);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="edit-course-content">
                    <label>Course name: </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    <label>Course description: </label>
                    <input type="text" name="desc" value={formData.desc} onChange={handleChange} />
                    <label>Max student count: </label>
                    <input type="text" name="maxStudentCount" value={formData.maxStudentCount} onChange={handleChange} />
                    <button type="submit" className="btn btn-success">Create/update course</button>
                </div>
            </form>
        </>
    );  
}

export default EditCourse;