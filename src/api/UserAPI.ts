import axios from "axios";
import { baseUrl, config } from "./index";
import { User, RegisteredUser } from "../shared/Types";

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