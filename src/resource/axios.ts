import axios, { AxiosInstance } from 'axios'

const axiosRequest: AxiosInstance = axios.create({
	baseURL: 'https://api-pratas.onrender.com/',
})

axiosRequest.interceptors.request.use(async (request) => {
	const token = localStorage.getItem('pratas:token')
	if (token) {
		request.headers.Authorization = `Bearer ${token}`
	}
	return request
})

export default axiosRequest
