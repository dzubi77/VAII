const ASSIGNMENTS_API_URL = process.env.REACT_APP_BACKEND_URL + '/assignments';

export const createAssignment = async (courseId, assignment) => {
    const response = await fetch(`${ASSIGNMENTS_API_URL}?courseId=${courseId}`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(assignment),
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to add assignment: ${errorDetails.message || response.status}`);
    }
    return await response.json();
}

export const getAssignmentsByCourse = async (courseId) => {
    try {
        const response = await fetch(`${ASSIGNMENTS_API_URL}/course/${courseId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch assignments for course.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching assignments by course:", error);
        throw error;
    }
}

export const getAssignmentById = async (assignmentId) => {
    const response = await fetch(`${ASSIGNMENTS_API_URL}/${assignmentId}`, {
        method: "GET",
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch assignment: ${errorDetails.message || response.status}`);
    }
    return await response.json();
}

export const updateAssignment = async (assignmentId, assignment) => {
    try {
        const response = await fetch(`${ASSIGNMENTS_API_URL}/${assignmentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(assignment),
        });
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`Failed to update assignment: ${errorDetails.message || response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating assignment:", error);
        throw error;
    }
}

export const deleteAssignment = async (assignmentId) => {
    try {
        const response = await fetch(`${ASSIGNMENTS_API_URL}/${assignmentId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete assignment.");
        }
        return true; 
    } catch (error) {
        console.error("Error deleting assignment:", error);
        throw error;
    }
}