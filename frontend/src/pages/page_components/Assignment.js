import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { deleteAssignment, getAssignmentsByCourse, getAssignmentById } from '../../service/AssignmentAPI';
import { getCourseById } from '../../service/CourseAPI';
import '../../styles/assignment_style.css'

export const Assignment = () => {
    const { courseId, assignmentId } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [error, setError] = useState('');
    //const [file, setFile] = useState(null);
    const role = localStorage.getItem('role');

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const data = await getAssignmentById(assignmentId);
                setAssignment(data);
            } catch (error) {
                setError('Failed to load assignment details.');
            }
        };
        fetchAssignment();
    }, [assignmentId]);
/*
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }
        try {
            //await uploadFile(assignmentId, file);
            //alert('File uploaded successfully!');
        } catch (error) {
            setError('Failed to upload file.');
        }
    };

    const handleDownloadFile = async () => {
        try {
            //await downloadFile(assignmentId);
        } catch (error) {
            setError('Failed to download file.');
        }
    };
*/
    if (!assignment) return <p>Loading assignment details...</p>;

    return (
        <div className="assignment-container">
            {error && <p className="error">{error}</p>}
            <h2>{assignment.assignmentTitle}</h2>
            <p><strong>Description:</strong> {assignment.assignmentDescription}</p>
            <p><strong>Due Date:</strong> {new Date(assignment.assignmentDate).toLocaleDateString()}</p>

            {role === 'STUDENT' && (
                <div className="file-upload">
                    FILE UPLOAD
                </div>
            )}

            {role === 'TEACHER' && (
                <button className="btn btn-secondary">Download Files</button>
            )}
            <Link to={`/course/${courseId}/assignments`} className="btn btn-primary">Back to assignments...</Link>
        </div>
    );
};

export const AssignmentMenu = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState('');
    const role = localStorage.getItem('role');

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const courseData = await getCourseById(courseId);
                setCourse(courseData);
            } catch (error) {
                setError('Failed to fetch course details');
            }
        };

        const fetchAssignmentsData = async () => {
            try {
                const assignmentsData = await getAssignmentsByCourse(courseId);
                setAssignments(assignmentsData);
            } catch (error) {
                setError('Failed to fetch assignments');
            }
        };

        fetchCourseData();
        fetchAssignmentsData();
    }, [courseId]);

    const handleDeleteAssignment = async (assignmentId) => {
        try {
            await deleteAssignment(assignmentId);
            const updatedAssignments = assignments.filter(a => a.assignmentId !== assignmentId);
            setAssignments(updatedAssignments);
        } catch (error) {
            setError('Failed to delete assignment');
        }
    };

    return (
        <div className="assignment-menu">
            {error && <p className="error">{error}</p>}
            {course && (
                <>
                    <h2>{course.courseName} - Assignments</h2>
                    {role === 'TEACHER' && (
                        <Link to={`/course/${courseId}/add-assignment`} className="btn btn-primary create-assignment-btn">
                            Create New Assignment
                        </Link>
                    )}

                    <table className="assignments-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Due Date</th>
                                {role === 'TEACHER' && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.length === 0 ? (
                                <tr><td colSpan={role === 'TEACHER' ? 3 : 2}>No assignments yet.</td></tr>
                            ) : (
                                assignments.map(assignment => (
                                    <tr key={assignment.assignmentId}>
                                        <td>
                                            <Link to={`/course/${courseId}/assignment/${assignment.assignmentId}`} className="btn btn-primary">
                                                {assignment.assignmentTitle}
                                            </Link>
                                        </td>
                                        <td>{new Date(assignment.assignmentDate).toLocaleDateString()}</td>
                                        {role === 'TEACHER' && (
                                            <td>
                                                <Link to={`/course/${courseId}/edit-assignment/${assignment.assignmentId}`} className="btn btn-secondary">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDeleteAssignment(assignment.assignmentId)} className="btn btn-danger">
                                                    Delete
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};