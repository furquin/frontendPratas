import { defineStore } from 'pinia'
import { HttpException } from '@/utils/http-exception'
import { FormaPagamento } from '@/types'
import axiosRequest from '@/resource/axios'

export const useFormasPagamentoStore = defineStore('formasPagamento', () => {
	async function findAll(): Promise<FormaPagamento[]> {
		const formasPagamento = await axiosRequest
			.get('/payment-methods')
			.then((response) => {
				return response.data
			})
			.catch((error) => {
				HttpException(error)
			})
		return formasPagamento
	}

	return {
		findAll,
	}
})
