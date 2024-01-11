import axios from "axios";
import { baseUrl, config } from "./index";
import { User, RegisteredUser, Cause } from "../shared/Types";

const API_PATH = `${baseUrl}/user`;

export const loginAPI = async (user: User) => {
    const response = await axios.post(`${API_PATH}/login`, user, config);
    return response.data;
}

export const registerAPI = async (user: RegisteredUser) => {
    console.log("adding API " + user)
    const response = await axios.post(`${API_PATH}/register`, user, config);
    return response.data;
}

export const getUserDetails = async (user: User) => {
    const response = await axios.get(`${API_PATH}/email/${user.email}`, config);
    return response.data;
}

export const getClasamentAPI = async () => {
    try {
        const response = await axios.get(`${API_PATH}/top`, config);
        return response.data as User[];
    } catch (error) {
        console.error("Error fetching clasament:", error);
        throw error;
    }
}

export const getUserOfCauzaAPI = async (cauzaId: Number) => {
    try {
        const response = await axios.get(`${API_PATH}/userofcauza/${cauzaId}`, config);
        return response.data as User;
    } catch (error) {
        console.error("Error fetching user of cause:", error);
        throw error;
    }
}

export const updateUserAPI = async (userId:Number, updatedUser: User) => {
    try {
        const response = await axios.put(`${API_PATH}/${userId}`, updatedUser, config);
        return response.data;
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
};