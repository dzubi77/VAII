import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/course_style.css';
import { getCourseById, updateCourse, addCourse } from '../../service/CourseAPI';
import FormValidation from '../../service/FormValidation';

export function EditCourse() {
    const { courseId } = useParams();
    const navigateTo = useNavigate();

    const initialFormData = {
        courseName: "",
        courseDescription: "",
        maxStudentCount: "",
    };

    const validateForm = (formData, setError) => {
        const courseName = formData.courseName;
        const courseDescription = formData.courseDescription;
        const maxStudentCount = parseInt(formData.maxStudentCount, 10);
        const errors = [];

        if (!courseName || !courseDescription || !maxStudentCount) {
            errors.push('One or more required fields are empty!');
        }
        if (courseName.length > 40) {
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
    };

    const { formData, setFormData, error, handleChange, handleSubmit } = FormValidation(initialFormData, validateForm);
    const instructorId = localStorage.getItem('userId');

    useEffect(() => {
        if (courseId) {
            const loadCourse = async () => {
                const course = await getCourseById(courseId);
                setFormData({
                    courseName: course.courseName,
                    courseDescription: course.courseDescription,
                    maxStudentCount: course.maxStudentCount.toString(),
                });
            };
            loadCourse();
        }
    }, [courseId, setFormData]);

    const submitForm = async (formData) => {
        const course = {
            courseName: formData.courseName,
            courseDescription: formData.courseDescription,
            maxStudentCount: parseInt(formData.maxStudentCount, 10),
        };

        if (courseId) {
            await updateCourse(courseId, course);
        } else {
            await addCourse(course, instructorId);
        }   
        
        navigateTo('/courses');
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e, submitForm)}>
                <div className="edit-course-content">
                    <label>Course name: </label>
                    <input type="text" name="courseName" value={formData.courseName} onChange={handleChange}/>

                    <label>Course description: </label>
                    <textarea type="text" name="courseDescription" value={formData.courseDescription} onChange={handleChange} />
                    
                    <label>Max student count: </label>
                    <input type="text" name="maxStudentCount" value={formData.maxStudentCount} onChange={handleChange}/>

                    {error && <div>{error}</div>}
                    <button type="submit" className="btn btn-success">
                        {courseId ? "Update" : "Create"} course
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigateTo('/courses')}>Cancel</button>
                </div>
            </form>
        </>
    );
}
