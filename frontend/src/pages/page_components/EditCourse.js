import React, { useState } from "react";
import '../../styles/course_style.css'
import { addCourse } from "../../service/CourseAPI";

//form for creating new/editing old course
//todo: validate form (check input) and save to db (then redirect to coursePage)
function EditCourse() {
    const [formData, setFormData] = useState({
        courseName: "",
        courseDescription: "",
        maxStudentCount: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const course = {
            courseName: formData.courseName,
            courseDescription: formData.courseDescription,
            maxStudentCount: parseInt(formData.maxStudentCount, 10),
          };
          console.log(course.courseName + ", " + course.courseDescription);
        const response = await addCourse(course);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="edit-course-content">
                    <label>Course name: </label>
                    <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} />
                    <label>Course description: </label>
                    <input type="text" name="courseDescription" value={formData.courseDescription} onChange={handleChange} />
                    <label>Max student count: </label>
                    <input type="text" name="maxStudentCount" value={formData.maxStudentCount} onChange={handleChange} />
                    <button type="submit" className="btn btn-success">Create/update course</button>
                </div>
            </form>
        </>
    );  
}

export default EditCourse;