const COURSE_API_URL = "http://localhost:8080";

export const fetchItems = async (setItems, setError) => {
    try {
        const fetched = await getAllCourses();
        setItems(fetched);
    } catch (error) {
        setError(error.message);
    }
}

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

export const getAllCourses = async() => {
    const response = await fetch(`${COURSE_API_URL}/courses/allCourses`, {
        method: "GET",
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch items: ${errorDetails.message || response.status}`);
    }
    return await response.json();
}

export const getCourseById = async(id) => {
    const response = await fetch(`${COURSE_API_URL}/courses/${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch items: ${errorDetails.message || response.status}`);
    }
    return await response.json();
}

export const updateCourse = async(id, course) => {
    const response = await fetch(`${COURSE_API_URL}/courses/${id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to edit item: ${errorDetails.message || response.status}`);
    }
    return await response.json();
}

export const deleteCourse = async (id) => {
    const response = await fetch(`${COURSE_API_URL}/courses/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status}`);
    }
    if (response.status !== 204) {
        return await response.json();
    }
    return null;
}