import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import '../../styles/course_style.css'
import { getCourseById, updateCourse, addCourse } from '../../service/CourseAPI';

//form for creating new/editing old courses

export function EditCourse() {
    const { courseId } = useParams();
    const [formData, setFormData] = useState({
        courseName: "",
        courseDescription: "",
        maxStudentCount: "",
    });
    const [error, setError] = useState('');

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
        if (validateForm()) {
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
        } else {
            
        }
    }

    const validateForm = () => {
        const courseName = formData.courseName;
        const courseDescription = formData.courseDescription;
        const maxStudentCount = parseInt(formData.maxStudentCount, 10);
        const errors = [];

        if (!courseName || !courseDescription || !maxStudentCount) {
            errors.push('One or more required fields are empty!');
        }  
        const strLen = courseName.length;
        if (strLen > 40) {
            errors.push('Course name can not be more than 40 characters long!');
        }
        if (maxStudentCount < 0) {
            errors.push('Student count can not be less than 0!');
        }

        if (errors.length > 0) {
            const err = errors.join(' ');
            setError(err);
            return false;
        }

        setError('');
        return true;
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
                    {error && <div>{error}</div>}
                    <button type="submit" className="btn btn-success">{courseId ? "Update" : "Create"} course</button>
                </div>
            </form>
        </>
    );  
}