import axios from "axios";
import { baseUrl, config } from "./index";
import { Cause } from "../shared/Types";

const API_PATH = `${baseUrl}/cauza`;

export const addCauseAPI = async (userID: number, cause: Cause) => {
    await axios.post(`${API_PATH}/${userID}`, cause, config);
}

export const getAllCauseAPI = async (): Promise<Cause[]> => {
    try {
        const response = await axios.get(`${API_PATH}`, config);
        return response.data as Cause[]; // Cast to Cause[]
    } catch (error) {
        console.error("Error fetching all causes:", error);
        throw error;
    }
};
export const getUserCauseAPI = async (): Promise<Cause[]> => {
// TODO cant find get causes for user so this does not work
    try {
        const response = await axios.get(`${API_PATH}`, config);
        return response.data as Cause[]; // Cast to Cause[]
    } catch (error) {
        console.error("Error fetching all causes:", error);
        throw error;
    }
}
export const deleteCauseAPI = async (causeId: Number) => {
    try {
        await axios.delete(`${API_PATH}/${causeId}`, config);
    }
    catch (error) {
        console.error("Error fetching all causes:", error);
        throw error;
    }
}