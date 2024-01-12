import axios from "axios";
import {baseUrl, config} from "./index";
import {Achievement} from "../shared/Types";

const API_PATH = `${baseUrl}/achievement`;

export const getAchievmentsAPI = async (): Promise<Achievement[]> => {
    try {
        const response = await axios.get(`${API_PATH}`, config);
        return response.data as Achievement[];
    } catch (error) {
        console.error("Error fetching all achievements:", error);
        throw error;
    }
};

export const userGotAchievementAPI = async(userId: number, achievementId: number): Promise<String> => {
    try{
        const response = await axios.get(`${API_PATH}/${userId}/${achievementId}`, config);
        return response.data as String;
    }
    catch(error){
        console.error("Error finding out if user has that achievement:", error);
        throw error;
    }
}