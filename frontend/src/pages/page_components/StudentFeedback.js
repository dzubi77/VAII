import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/course_style.css';
import '../../styles/feedback_style.css';
import { addFeedback } from '../../service/FeedbackAPI';
import FormValidation from '../../service/FormValidation';

export function EditFeedback() {
    const navigateTo = useNavigate();
    const { courseId } = useParams(); 

    const initialFormData = {
        feedbackText: "",
    };

    const validateForm = (formData, setError) => {
        const feedbackText = formData.feedbackText;
        const errors = [];

        if (!feedbackText) {
            errors.push('All fields are required!');
        }
        if (feedbackText.length > 500) {
            errors.push('Feedback cannot exceed 500 characters!');
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
    const authorId = localStorage.getItem('userId');

    const submitForm = async (formData) => {
        await addFeedback(courseId, authorId, formData.feedbackText);
        navigateTo(`/course/${courseId}`);
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e, submitForm)}>
                <div className="edit-feedback-content">
                    <label>Feedback: </label>
                    <textarea
                        name="feedbackText"
                        value={formData.feedbackText}
                        onChange={handleChange}
                    />
                    {error && <div>{error}</div>}
                    <button type="submit" className="btn btn-success">
                        Submit feedback
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigateTo(`/course/${courseId}`)}>Cancel</button>
                </div>
            </form>
        </>
    );
}
