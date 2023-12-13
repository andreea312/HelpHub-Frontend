import axios from "axios";
import {baseUrl, config} from "./index";
import {Cause, CauseUpdate} from "../shared/Types";

const API_PATH = `${baseUrl}/cauza`;

export const addCauseAPI = async (userID: number, cause: Cause): Promise<Cause> => {
    const addedCause = await axios.post(`${API_PATH}/${userID}`, cause, config);
    return addedCause.data;
}

export const savePicturesForCause = async(cauzaID: number, images: File[]) => {
    const pictures = new FormData();
    images.forEach((picture, index) => {
        console.log(picture);
        pictures.append(`pictures`, picture);
    });
    console.log('saving pictures...', pictures);
    await axios.post(`${API_PATH}/saveImages/${cauzaID}`, pictures, { headers: {'Content-Type': 'multipart/form-data'} });
}

export const getPicturesForCause = async(url: String) => {
    const response = await axios.get(`${baseUrl}${url}`, { responseType: 'blob' });
    return response.data;
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
export const getUserCauseAPI = async (userID: number): Promise<Cause[]> => {
    try {
        const response = await axios.get(`${API_PATH}/users/${userID}`, config);
        return response.data as Cause[]; // Cast to Cause[]
    } catch (error) {
        console.error("Error fetching all causes:", error);
        throw error;
    }
}
export const deleteCauseAPI = async (causeId: Number) => {
    try {
        await axios.delete(`${API_PATH}/${causeId}`, config);
    } catch (error) {
        console.error("Error fetching all causes:", error);
        throw error;
    }
}

export const updateCauseAPI = async (causeId:Number, updatedCause: CauseUpdate) => {
    try {
        console.log("1")
        console.log(updatedCause)
        const response = await axios.put(`${API_PATH}/${causeId}`, updatedCause, config);
        console.log("2")
        console.log("aaaaaaaaaaaaaaaaaaaaa")
        return response.data;
    } catch (error) {
        console.error(`Error updating cause with ID ${causeId}:`, error);
        throw error;
    }
};

export const getCauseByIdAPI = async (causeId: number): Promise<CauseUpdate> => {
    try {
        const response = await axios.get(`${API_PATH}/${causeId}`, config);
        return response.data as CauseUpdate;
    } catch (error) {
        console.error(`Error fetching cause with ID ${causeId}:`, error);
        throw error;
    }
};

export const donateToCauseAPI = async (causeId: number, userId: number, sum: number, currency: String) => {
    try {
      const response = await axios.put(`${API_PATH}/donate/${causeId}/${userId}/${sum}/${currency}`, null, config);
      return response.data;
    } catch (error) {
      console.error('Error donating to cause:', error);
      throw error;
    }
  };
