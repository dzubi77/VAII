const FEEDBACK_API_URL = process.env.REACT_APP_BACKEND_URL + '/feedbacks';

export const addFeedback = async (courseId, authorId, feedbackText) => {
    try {
        const response = await fetch(`${FEEDBACK_API_URL}?courseId=${courseId}&authorId=${authorId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(feedbackText),  
        });
        return await response.json();
    } catch (error) {
        console.error("Error adding feedback:", error);
        throw error;
    }
};

export const deleteFeedback = async (feedbackId, userId) => {
    try {
        const response = await fetch(`${FEEDBACK_API_URL}/${feedbackId}?userId=${userId}`, {
                method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete feedback.");
        }
        return true; 
    } catch (error) {
        console.error("Error deleting feedback:", error);
        throw error;
    }
};

export const getFeedbackById = async (feedbackId) => {
    try {
        const response = await fetch(`${FEEDBACK_API_URL}/${feedbackId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch feedback.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching feedback:", error);
        throw error;
    }
};

export const getFeedbackByCourse = async (courseId) => {
    try {
        const response = await fetch(`${FEEDBACK_API_URL}/course/${courseId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch feedback for course.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching feedback by course:", error);
        throw error;
    }
};
