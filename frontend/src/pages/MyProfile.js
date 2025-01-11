import React, { useEffect, useState } from 'react';
import { getUserById } from '../service/UserAPI'; 

export const MyProfile = () => {
    const userId = localStorage.getItem('userId');

    const [user, setUser] = useState(null);
    const [coursesTaught, setCoursesTaught] = useState([]);
    const [coursesAttended, setCoursesAttended] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);

    useEffect(() => {
        console.log('sending id: ' + userId)
        const fetchUserProfile = async () => {
            const response = await getUserById(userId);
            setUser(response);
            setCoursesTaught(response.courses);
            setCoursesAttended(response.enrolledCourses);
        };

        fetchUserProfile();
    }, [userId]);

    const handlePasswordChange = async () => {
       
    };

    return (
        <div className="profile-container">
            {user ? (
                <>
                    <h1>{user.username + ' ' + user.surname}'s Profile</h1>
                    <p>Username: {user.username}</p>

                    {user.userRole === 'TEACHER' && (
                        <>
                            <h3>Courses Taught</h3>
                            {coursesTaught.length > 0 ? (
                                <ul>
                                    {coursesTaught.map(course => (
                                        <li key={course.courseId}>{course.courseName}</li>
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
                                <ul>
                                    {coursesAttended.map(course => (
                                        <li key={course.courseId}>{course.courseName}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No courses attended</p>
                            )}
                        </>
                    )}

                    <h3>Change Password</h3>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordChange}>Change Password</button>
                    {passwordChanged && <p>Password updated successfully!</p>}
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};
