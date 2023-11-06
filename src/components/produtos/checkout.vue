<template>
	<q-page padding class="row">
		<q-table
			title="Produtos"
			flat
			:rows="produtos"
			:columns="columns"
			row-key="id"
			:rows-per-page-options="[10, 25, 50]"
			table-header-class="text-white bg-primary"
			card-class="bg-grey-2"
			style="border-radius: 8px"
		>
			<template v-slot:top>
				<h5 class="q-mr-md">Produtos</h5>
				<q-space />
				<q-input dense v-model="filter" style="width: 40%" label="Nome, descrição ou código"> </q-input>
				<q-btn icon="search_none" @click="filterProducts(filter)" color="info"> Buscar </q-btn>
			</template>
			<template v-slot:body-cell-actions="props">
				<q-tr :props="props">
					<q-td :props="props">
						<q-btn color="info" icon="add_shopping_cart" @click="addCarinho(props.row)" />
					</q-td>
				</q-tr>
			</template>
		</q-table>
		<div class="q-pa"></div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axiosRequest from '@/resource/axios'
import { IProduto } from './interfaces/produto.interface'
import DialogAddCarrinho from './dialogs/addCarrinho.dialog.vue'
import { HttpException } from '@/utils/http-exception'

export default defineComponent({
	name: 'Checkout-component',
	data() {
		return {
			filter: '',
			carrinho: [],
			columns: [
				{
					name: 'actions',
					label: 'Ações',
					field: 'actions',
					style: 'width: 5%',
				},
				{
					name: 'name',
					label: 'Nome',
					field: 'name',
					style: 'width: 20%',
					sortable: true,
				},
				{
					name: 'description',
					label: 'Descrição',
					field: 'description',
					style: 'width: 40%',
				},
				{
					name: 'price',
					label: 'Preço',
					field: 'price',
					style: 'width: 10%',
				},
				{
					name: 'quantity',
					label: 'Quantidade',
					field: 'quantity',
					style: 'width: 10%',
				},
				{
					name: 'barCode',
					label: 'Código',
					field: 'barCode',
					style: 'width: 15%',
				},
				{
					name: 'size',
					label: 'Tamanho',
					field: 'size',
					style: 'width: 5%',
				},
			],
			produtos: [],
		}
	},
	methods: {
		async filterProducts(input: string) {
			await axiosRequest
				.get(`/products?filter=${input}`)
				.then((response) => {
					this.produtos = response.data
					this.filter = ''
				})
				.catch((error) => {
					HttpException(error)
				})
		},

		addCarinho(row: IProduto) {
			this.$q
				.dialog({
					component: DialogAddCarrinho,
					componentProps: {
						produto: row,
					},
				})
				.onOk(() => {
					this.$q.notify({
						color: 'positive',
						message: `Produto ${row.name} adicionado ao carrinho!`,
					})
				})
		},
	},
	async created() {
		await axiosRequest
			.get('/products?filter')
			.then((response) => {
				this.produtos = response.data
			})
			.catch((error) => {
				HttpException(error)
			})
	},
})
</script>

<style scoped lang="scss"></style>
