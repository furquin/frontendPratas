<template>
	<q-page class="column" padding>
		<q-table
			title="Carrinho"
			flat
			:columns="columns"
			:rows="rows"
			row-key="id"
			:rows-per-page-options="[10, 25, 50]"
			table-header-class="text-white bg-primary"
			card-class="bg-grey-2"
			style="border-radius: 8px"
		>
			<template v-slot:top>
				<div class="row justify-between col-12">
					<div>
						<q-btn color="primary" icon="arrow_back" to="/checkout" label="Voltar" style="width: 100%" />
					</div>
					<h5 class="q-mr-md">Carrinho</h5>
				</div>
			</template>
			<template v-slot:body-cell-actions="props">
				<q-tr :props="props">
					<q-td :props="props">
						<q-btn @click="remove(props.row)" color="negative" icon="remove" />
					</q-td>
					<q-td :props="props">
						<q-btn @click="adicionar(props.row)" color="positive" icon="add" />
					</q-td>
				</q-tr>
			</template>
			<template v-slot:bottom>
				<div class="row justify-center col-8">
					<div class="row items-center col-8">
						<q-btn color="positive" label="Finalizar" style="width: 100%" />
					</div>
				</div>
			</template>
		</q-table>
	</q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Carrinho } from '@/types'
const columns = [
	{
		name: 'actions',
		label: 'Ações',
		field: 'actions',
		style: 'width: 10%',
	},
	{
		name: 'description',
		label: 'Descrição',
		field: 'description',
		style: 'width: 70%',
	},
	{
		name: 'price',
		label: 'Preço Unitário',
		field: 'price',
		style: 'width: 5%',
	},
	{
		name: 'quantity',
		label: 'Quantidade',
		field: 'totalQuantity',
		style: 'width: 5%',
	},
	{
		name: 'totalPrice',
		label: 'Preço Total',
		field: 'totalPrice',
		style: 'width: 10%',
	},
]

const rows: Carrinho[] = JSON.parse(localStorage.getItem('pratas:carrinho') as string).carrinho

export default defineComponent({
	name: 'DialogCarrinho-componente',
	components: {},
	data() {
		return {
			columns,
			rows,
		}
	},
	methods: {
		remove(row: Carrinho) {
			if (row.totalQuantity > 1) {
				const products = localStorage.getItem('pratas:carrinho')
				const { carrinho } = products && JSON.parse(products)
				carrinho.forEach((item: Carrinho) => {
					if (item.id === row.id) {
						item.totalQuantity -= 1
						item.totalPrice = Number((item.totalQuantity * item.price).toFixed(2))
					}
				})
				localStorage.setItem('pratas:carrinho', JSON.stringify({ carrinho }))
				this.rows = JSON.parse(localStorage.getItem('pratas:carrinho') as string).carrinho
			} else {
				this.$q
					.dialog({
						title: 'Remover produto do carrinho',
						message: 'Deseja remover o produto do carrinho?',
						cancel: {
							label: 'Cancelar',
							color: 'negative',
						},
						ok: {
							label: 'Remover',
							color: 'positive',
						},
						persistent: true,
					})
					.onOk(() => {
						const products = localStorage.getItem('pratas:carrinho')
						const { carrinho } = products && JSON.parse(products)

						carrinho.forEach((item: any, index: number) => {
							if (item.id === row.id) {
								carrinho.splice(index, 1)
							}
						})
						localStorage.setItem('pratas:carrinho', JSON.stringify({ carrinho }))
						this.rows = JSON.parse(localStorage.getItem('pratas:carrinho') as string).carrinho
					})
			}
		},
		adicionar(row: Carrinho) {
			const products = localStorage.getItem('pratas:carrinho')
			const { carrinho } = products && JSON.parse(products)
			carrinho.forEach((item: Carrinho) => {
				if (item.id === row.id) {
					if (item.totalQuantity >= item.quantity) {
						this.$q.notify({
							color: 'negative',
							message: `Quantidade máxima em estoque atingida!`,
						})
					} else {
						item.totalQuantity += 1
						item.totalPrice = Number((item.totalQuantity * item.price).toFixed(2))
						this.rows = JSON.parse(localStorage.getItem('pratas:carrinho') as string).carrinho
					}
				}
			})
			localStorage.setItem('pratas:carrinho', JSON.stringify({ carrinho }))
			this.rows = JSON.parse(localStorage.getItem('pratas:carrinho') as string).carrinho
		},
	},
	created() {
		const carrinho = localStorage.getItem('pratas:carrinho')
		if (carrinho) {
			this.rows = JSON.parse(carrinho).carrinho
		} else {
			localStorage.setItem('pratas:carrinho', JSON.stringify({ carrinho: [] }))
		}
	},
})
</script>
<style scoped></style>
