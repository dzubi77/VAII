import React, { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../service/UserAPI'; 
import '../styles/profile_style.css';

export const MyProfile = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [coursesTaught, setCoursesTaught] = useState([]);
    const [coursesAttended, setCoursesAttended] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserById(userId);
                setUser(response);
                setCoursesTaught(response.courses);
                setCoursesAttended(response.enrolledCourses);
            } catch (err) {
                setError('Failed to load profile.');
            }
        };
        fetchUserProfile();
    }, [userId]);

    const handlePasswordChange = async () => {
        if (!newPassword) {
            setError('Password cannot be empty.');
            return;
        }

        try {
            await updateUser(userId, { ...user, password: newPassword });
            setPasswordChanged(true);
            setNewPassword('');
            setError('');
        } catch (err) {
            setError('Failed to update password.');
        }
    };

    return (
        <div className="profile-container">
            {user ? (
                <>
                    <h1>{user.name} {user.surname}'s Profile</h1>
                    <p><strong>Username:</strong> {user.username}</p>

                    {user.userRole === 'TEACHER' && (
                        <>
                            <h3>Courses Taught</h3>
                            {coursesTaught.length > 0 ? (
                                <ul className="courses-list">
                                    {coursesTaught.map(course => (
                                        <li key={course.courseId}>
                                            <a href={`/course/${course.courseId}`} className="course-link">
                                                {course.courseName}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No courses taught</p>
                            )}
                        </>
                    )}

                    {user.userRole === 'STUDENT' && (
                        <>
                            <h3>Courses Attended</h3>
                            {coursesAttended.length > 0 ? (
                                <ul className="courses-list">
                                    {coursesAttended.map(course => (
                                        <li key={course.courseId}>
                                            <a href={`/course/${course.courseId}`} className="course-link">
                                                {course.courseName}
                                            </a>
                                        </li>   
                                    ))}
                                </ul>
                            ) : (
                                <p>No courses attended</p>
                            )}
                        </>
                    )}
                    <hr></hr>
                    <h3>Change Password</h3>
                    <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="password-input"/>
                    <button onClick={handlePasswordChange} className="btn btn-primary">Change Password</button>
                    {passwordChanged && <p className="success">Password updated successfully!</p>}
                    {error && <p className="error">{error}</p>}
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};
