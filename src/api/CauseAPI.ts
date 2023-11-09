import axios from "axios";
import { baseUrl, config } from "./index";
import { Cause } from "../shared/Types";

const API_PATH = `${baseUrl}/cauza`;

export const addCauseAPI = async (userID: number, cause: Cause) => {
    await axios.post(`${API_PATH}/${userID}`, cause, config);
}