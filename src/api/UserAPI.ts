import axios from "axios";
import { baseUrl, config } from "./index";
import { User } from "../shared/Types";

const API_PATH = `${baseUrl}/user`;

export const loginAPI = async (user: User) => {
    const response = await axios.post(`${API_PATH}/login`, user, config);
    return response.data;
}