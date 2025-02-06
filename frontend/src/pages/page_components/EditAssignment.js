import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormValidation from '../../service/FormValidation';
import { createAssignment, getAssignmentById, updateAssignment } from '../../service/AssignmentAPI';
import '../../styles/assignment_style.css'

export function EditAssignment() {
    const { courseId, assignmentId } = useParams();
    const navigateTo = useNavigate();

    const initialFormData = {
        assignmentTitle: '',
        assignmentDescription: '',
        assignmentDate: '',
    };

    const validateForm = (formData, setError) => {
        const assignmentTitle = formData.assignmentTitle;
        const assignmentDescription = formData.assignmentDescription;
        const assignmentDate = formData.assignmentDate;
        const errors = [];

        if (!assignmentTitle || !assignmentDescription || !assignmentDate) {
            errors.push('One or more required fields are empty!');
        }
        if (assignmentTitle.length > 30) {
            errors.push('Title cannot be more than 30 characters long!');
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

    useEffect(() => {
        if (assignmentId) {
            const loadAssignment = async () => {
                const assignment = await getAssignmentById(assignmentId);
                setFormData({
                    assignmentTitle: assignment.assignmentTitle,
                    assignmentDescription: assignment.assignmentDescription,
                    assignmentDate: assignment.assignmentDate,
                });
            };
            loadAssignment();
        }
    }, [assignmentId, setFormData]);

    const submitForm = async (formData) => {
        const formattedDate = new Date(formData.assignmentDate).toISOString().split('T')[0];
        const assignment = {
            assignmentTitle: formData.assignmentTitle,
            assignmentDescription: formData.assignmentDescription,
            assignmentDate: formattedDate, 
        };

        if (assignmentId) {
            await updateAssignment(assignmentId, assignment);
        } else {
            await createAssignment(courseId, assignment)
        }
        navigateTo(`/course/${courseId}/assignments`);
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e, submitForm)}>
                <div className="edit-assignment-content">
                    <label>Assignment title: </label>
                    <input type="text" name="assignmentTitle" value={formData.assignmentTitle} onChange={handleChange} />
                    <label>Assignment description: </label>
                    <textarea name="assignmentDescription" value={formData.assignmentDescription} onChange={handleChange} />
                    <label>Due date: </label>
                    <input type="date" name="assignmentDate" value={formData.assignmentDate} onChange={handleChange} />
                    
                    {error && <div className="error">{error}</div>}
                    
                    <button type="submit" className="btn btn-success">
                        {assignmentId ? 'Update' : 'Create'} Assignment
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigateTo(`/course/${courseId}/assignments`)}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
}

