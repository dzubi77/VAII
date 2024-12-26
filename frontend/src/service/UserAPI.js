const USER_API_URL = "http://localhost:8080/users";

export const createUser = async(user) => {
    const response = await fetch(`${USER_API_URL}`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.created) {
        const errorDetails = await response.json();
        throw new Error(`Failed to add item: ${errorDetails.message || response.status}`);
    }
    return await response.json();
}

export const getUsers = async() => {

}

export const getUserById = async() => {

}

export const updateUser = async() => {

}

export const deleteUser = async() => {

}