import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import '../../styles/course_style.css'
import { getCourseById, updateCourse, addCourse } from '../../service/CourseAPI';
//form for creating new/editing old courses
//TODO: validate form (check input)
function EditCourse() {
    const { courseId } = useParams();
    const [formData, setFormData] = useState({
        courseName: "",
        courseDescription: "",
        maxStudentCount: "",
    });

    const navigateTo = useNavigate();

    useEffect(() => {
        if (courseId) {
            const loadCourse = async() => {
                const course = await getCourseById(courseId);
                setFormData({
                    courseName: course.courseName,
                    courseDescription: course.courseDescription,
                    maxStudentCount: course.maxStudentCount.toString(),
                });
            };
            loadCourse();
        }
    }, [courseId]);

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

        if (courseId) {
            await updateCourse(courseId, course)
        } else {
            await addCourse(course);
        }
        navigateTo('/courses');
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
                    <button type="submit" className="btn btn-success">{courseId ? "Update" : "Create"} course</button>
                </div>
            </form>
        </>
    );  
}

export default EditCourse;