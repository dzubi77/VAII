import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { deleteAssignment, getAssignmentsByCourse } from '../../service/AssignmentAPI';
import { getCourseById } from '../../service/CourseAPI';

export const Assignment = () => {
    return (
        <>
        Here will be one assignment
        </>
    );
}

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
                                        <td>{assignment.assignmentTitle}</td>
                                        <td>{new Date(assignment.assignmentDate).toLocaleDateString()}</td>
                                        {role === 'TEACHER' && (
                                            <td>
                                                <Link to={`/course/${courseId}/edit-assignment/${assignment.assignmentId}`} className="btn btn-secondary">
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={() => handleDeleteAssignment(assignment.assignmentId)} 
                                                    className="btn btn-danger">
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