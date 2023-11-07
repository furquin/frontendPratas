import { defineStore } from 'pinia'

import { HttpException } from '@/utils/http-exception'

import { User } from '@/types'
import { ref } from 'vue'
import axiosRequest from '@/resource/axios'

export const useAuthStore = defineStore('auth', () => {
	const user = ref<User | null>(null)

	async function login(email: string, password: string) {
		await axiosRequest
			.post('/login', {
				email,
				password,
			})
			.then((response) => {
				const { login, user } = response.data

				localStorage.setItem('pratas:token', login.token)
				localStorage.setItem('pratas:user', JSON.stringify(user))
			})
			.catch((error) => {
				HttpException(error)
			})

		return validateToken()
	}

	async function validateToken() {
		const token = localStorage.getItem('pratas:token')

		if (!token) {
			return false
		}

		return true
	}

	function logout() {
		localStorage.removeItem('pratas:token')
		localStorage.removeItem('pratas:user')

		user.value = null
	}

	return {
		user,
		login,
		validateToken,
		logout,
	}
})
