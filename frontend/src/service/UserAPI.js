const USER_API_URL = "http://localhost:8080/users";

export const createUser = async(user) => {
    const response = await fetch(`${USER_API_URL}`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (response.status !== 201) {
        const errorDetails = await response.json();
        throw new Error(`Failed to add user: ${errorDetails.message || response.status}`);
    }
    return await response.json();
}

export const getUsers = async() => {
    const response = await fetch(`${USER_API_URL}/all`, {
        method: "GET",
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch users: ${errorDetails.message || response.status}`);
    }
    const bla = await response.json();
    console.log(bla);
    return bla;
}

export const getUserById = async() => {

}

export const updateUser = async() => {

}

export const deleteUser = async() => {

}