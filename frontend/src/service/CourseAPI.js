const COURSE_API_URL = "http://localhost:8080";

export const addCourse = async (course) => {
    const response = await fetch(`${COURSE_API_URL}/courses`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
    });
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`Failed to add item: ${errorDetails.message || response.status}`);
        }
    return await response.json();
}