import axios, { AxiosInstance } from 'axios'

const axiosRequest: AxiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
})

axiosRequest.interceptors.request.use(async (request) => {
	const token = localStorage.getItem('pratas:token')
	if (token) {
		request.headers.Authorization = `Bearer ${token}`
	}
	return request
})

export default axiosRequest
