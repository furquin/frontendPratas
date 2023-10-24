import axios, { AxiosInstance } from "axios";

const axiosRequest: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
})

export default axiosRequest