import { defineStore } from 'pinia'

import { HttpException } from '@/utils/http-exception'

import { Role, User } from '@/types'
import { ref } from 'vue'
import axiosRequest from '@/resource/axios'

export const useAuthStore = defineStore('auth', () => {
	const user = ref<User | null>(null)
	const role = ref<Role | string>('')

	async function login(email: string, password: string) {
		const { status, data } = await axiosRequest.post('/auth/login', {
			email,
			password,
		})

		if (status !== 200) {
			HttpException(data)
			return false
		}

		localStorage.setItem('pratas:token', data.token)

		return validateToken()
	}

	async function validateToken() {
		const token = localStorage.getItem('pratas:token')

		if (!token) {
			return false
		}

		const { status, data } = await axiosRequest.get('/me')

		if (status !== 200) {
			HttpException(data)
			return false
		}

		user.value = data.user
		role.value = data.roles

		localStorage.setItem('pratas:user', JSON.stringify(data.user))
		localStorage.setItem('pratas:roles', JSON.stringify(data.roles))

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
