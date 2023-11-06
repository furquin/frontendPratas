import { defineStore } from 'pinia'

import { HttpException } from '@/utils/http-exception'

import { Role, User } from '@/types'
import { ref } from 'vue'
import axiosRequest from '@/resource/axios'

export const useAuthStore = defineStore('auth', () => {
	const user = ref<User | null>(null)
	const role = ref<Role | string>('')

	async function login(email: string, password: string) {
		await axiosRequest
			.post('/login', {
				email,
				password,
			})
			.then((response) => {
				localStorage.setItem('pratas:token', response.data.login.token)
				localStorage.setItem('pratas:user', response.data.user)
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
		localStorage.removeItem('pratas:roles')

		user.value = null
		role.value = ''
	}

	return {
		user,
		role: role,
		login,
		validateToken,
		logout,
	}
})
