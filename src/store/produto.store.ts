import { defineStore } from 'pinia'
import { Produto } from '@/types'
import { ref } from 'vue'
import axiosRequest from '@/resource/axios'
import { HttpException } from '@/utils/http-exception'

export const useProdutoStore = defineStore('product', () => {
	const produtos = ref<Produto[]>([])
	const produto = ref<Produto>()

	async function getProdutos(filter?: string): Promise<void> {
		filter = filter ? filter : ''
		await axiosRequest
			.get(`/products?filter=${filter}`)
			.then((response) => {
				produtos.value = response.data
			})
			.catch((error) => {
				HttpException(error)
			})
	}

	async function getProduto(id: number) {
		await axiosRequest
			.get(`/products/${id}`)
			.then((response) => {
				produto.value = response.data
			})
			.catch((error) => {
				HttpException(error)
			})
	}

	async function createProduto(props: {
		name: string
		description: string
		price: number
		quantity: number
		barCode: string
	}) {
		await axiosRequest
			.post('/products', props)
			.then((response) => {
				produtos.value = response.data
			})
			.catch((error) => {
				HttpException(error)
			})
	}

	async function updateProduto(
		id: number,
		props: {
			name: string
			description: string
			price: number
			quantity: number
			barCode: string
		}
	) {
		await axiosRequest
			.patch(`/products/${id}`, props)
			.then((response) => {
				produtos.value = response.data
			})
			.catch((error) => {
				HttpException(error)
			})
	}

	async function deleteProduto(id: number) {
		await axiosRequest
			.delete(`/products/${id}`)
			.then((response) => {
				produtos.value = response.data
			})
			.catch((error) => {
				HttpException(error)
			})
	}

	async function finishCheckout(data: any): Promise<boolean> {
		await axiosRequest.post('/products/checkout', data).catch((error) => {
			HttpException(error)
		})

		return true
	}

	return {
		produtos,
		produto,
		getProdutos,
		getProduto,
		createProduto,
		updateProduto,
		deleteProduto,
		finishCheckout,
	}
})
