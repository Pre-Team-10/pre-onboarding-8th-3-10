import axios from "axios";

const BASE_URL = "http://localhost:4000/sick";

export const searchAxiosInstance = axios.create({ baseURL: BASE_URL });
