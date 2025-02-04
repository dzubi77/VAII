const FEEDBACK_API_URL = process.env.REACT_APP_BACKEND_URL + '/feedbacks';

export const addFeedback = async(feedback) => {
    try {
        const response = await fetch(`${FEEDBACK_API_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedback),
        });

        if (!response.ok) {
            throw new Error("Failed to add feedback.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding feedback:", error);
        throw error;
    }
}

export const updateFeedback = async(feedbackId, updatedFeedback) => {
    try {
        const response = await fetch(`${FEEDBACK_API_URL}/update/${feedbackId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFeedback),
        });

        if (!response.ok) {
            throw new Error("Failed to update feedback.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating feedback:", error);
        throw error;
    }
}

export const deleteFeedback = async(feedbackId) => {
    try {
        const response = await fetch(`${FEEDBACK_API_URL}/delete/${feedbackId}`, {
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
}

export const getFeedbackById = async(feedbackId) => {
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
}

export const getFeedbackByCourse = async(courseId) => {
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
}