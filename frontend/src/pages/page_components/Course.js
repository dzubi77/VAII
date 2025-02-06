import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dropStudent, enrollStudent, getCourseById } from "../../service/CourseAPI"; 
import { deleteFeedback, getFeedbackByCourse } from "../../service/FeedbackAPI";
import '../../styles/course_style.css';

export const CourseView = ({ item, onDelete, isDeleting }) => {
    const [isInstructor, setIsInstructor] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false); 
    const [enrollmentError, setEnrollmentError] = useState(null); 

    useEffect(() => {
        const role = localStorage.getItem('role');
        setIsInstructor(role === 'TEACHER'); 
    }, []);

    const studentId = localStorage.getItem('userId');

    const handleJoinCourse = async (courseId) => {
        if (!studentId) {
            alert("You have to be logged in to join the course!");
            return;
        }
        setIsEnrolling(true);
        setEnrollmentError(null); 
        try {
            await enrollStudent(courseId, studentId); 
            alert("Successfully enrolled in the course!"); 
        } catch (error) {
            setEnrollmentError("Failed to enroll in the course!");
        } finally {
            setIsEnrolling(false);
        }
    };

    if (isInstructor) {
        return (
            <div className="course-item-content">
                <h3>{item.courseName}</h3>
                <div className="course-item-buttons">
                    <Link to={`/edit_course/${item.courseId}`} className="btn btn-warning">Edit course</Link>
                    <button type="button" className="btn btn-danger" onClick={() => onDelete(item.courseId)} disabled={isDeleting}>Delete course</button>
                    <Link to={`/course/${item.courseId}`} className="btn btn-primary">More information...</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="course-item-content">
            <h3>{item.courseName}</h3>
            <div className="course-item-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => handleJoinCourse(item.courseId)} disabled={isEnrolling}>
                {isEnrolling ? "Enrolling..." : "Join course"}
                </button>
                <Link to={`/course/${item.courseId}`} className="btn btn-primary">More information...</Link>
            </div>
            {enrollmentError && <p className="error-message">{enrollmentError}</p>} 
        </div>
    );
}

export const CourseViewMoreInfo = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const role = localStorage.getItem('role');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const data = await getCourseById(courseId);
                setCourse(data);
            } catch (err) {
                setError("Failed to load course details.");
            }
        };

        const fetchFeedbacks = async () => {
            try {
                const feedbackData = await getFeedbackByCourse(courseId);
                setFeedbacks(feedbackData);
            } catch (err) {
                console.error("Failed to load feedback:", err);
            }
        };

        fetchCourseDetails();
        fetchFeedbacks();
        setLoading(false);
    }, [courseId]);

    const handleDeleteFeedback = async (feedbackId) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
            await deleteFeedback(feedbackId);
            setFeedbacks(feedbacks.filter(f => f.id !== feedbackId));
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p className="error-message">{error}</p>;
    } 
    if (!course) {
        return <p>No course data available.</p>;
    } 

    const studentList = course.students;
    return (
        <>
            <div className="course-info">
                <h2>{course.courseName}</h2>
                <p>{course.courseDescription}</p>
                <br></br>
                <br></br>
                {(role === 'TEACHER' || role === 'ADMIN') && (
                    <>
                        <h4>******* Students in course [{course.studentCount}/{course.maxStudentCount}] *******</h4>
                        {studentList.length === 0 ? (
                            <p>No students enrolled in this course.</p>
                        ) : (
                            <ul className="student-list">
                                {studentList.map((student) => (
                                    <li key={student.userId} className="student-item">
                                        {student.name} {student.surname}
                                        <button className="btn btn-primary" onClick={() => dropStudent(course.courseId, student.userId)}>Drop student from course</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
            <div className="feedback-section">
                <h3>********** Feedback **********</h3>
                {role === 'STUDENT' && (
                    <Link to={`/course/${courseId}/add-feedback`} className="btn btn-primary add-feedback-btn">
                        Add Feedback
                    </Link>
                )}
                {feedbacks.length === 0 ? (
                    <p className="no-feedback">No feedback yet.</p>
                ) : (
                    feedbacks.map((feedback) => (
                        <div key={feedback.feedbackId} className="feedback-item">
                            <p className="feedback-text">{feedback.feedbackText}</p>
                            {role === 'ADMIN' && (
                                <>
                                    <button onClick={() => handleDeleteFeedback(feedback.feedbackId)} className="btn btn-danger delete-feedback-btn">
                                        Delete feedback
                                    </button>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
            <div className="btn-container">
                <Link to={'/courses'} className="btn btn-secondary back-btn">
                    Back to courses...
                </Link>
                {localStorage.getItem('role')?.trim() && 
                    <Link to={`/course/${courseId}/assignments`} className="btn back-btn">
                        See course assignments
                    </Link>
                }
            </div>
        </>
    );
};
