<template>
	<q-dialog ref="dialog">
		<q-card style="width: 50%">
			<q-card-section class="row justify-center">
				<h5 class="text-black">Adicionar produto ao carrinho</h5>
			</q-card-section>
			<q-card-section class="row justify-center">
				<div class="text-positive">Deseja adicionar o produto {{ produto.name }} ao carrinho?</div>
			</q-card-section>
			<q-card-section>
				<q-input type="number" color="info" filled v-model.number="quantity" label="Quantidade" class="q-mb-md q-pa-md">
				</q-input>
			</q-card-section>
			<q-card-actions class="row justify-around">
				<q-btn flat label="Não" color="negative" v-close-popup></q-btn>
				<q-btn flat label="Sim" color="positive" @click="adicionarProduto"></q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { QDialog } from 'quasar'
import { Produto } from '@/types'
export default defineComponent({
	name: 'DialogAdicionarProdutoCarrinho-componente',
	data() {
		return {
			quantity: 1,
		}
	},
	props: {
		produto: {
			type: Object as () => Produto,
			required: true,
		},
	},
	methods: {
		async adicionarProduto() {
			const storage = localStorage.getItem('pratas:carrinho')
			const stored = storage && JSON.parse(storage)
			if (stored.carrinho.length) {
				const productExist = stored.carrinho.filter((item: Produto) => item.id === this.produto.id)
				if (productExist.length) {
					const index = stored.carrinho.findIndex((item: Produto) => item.id === this.produto.id)
					stored.carrinho[index].totalQuantity += this.quantity
					stored.carrinho[index].totalPrice = stored.carrinho[index].totalQuantity * this.produto.price
				} else {
					stored.carrinho.push({
						totalPrice: Number((this.produto.price * this.quantity).toFixed(2)),
						totalQuantity: this.quantity,
						id: this.produto.id,
						description: this.produto.description,
						quantity: this.produto.quantity,
						price: this.produto.price,
					})
				}
			} else {
				stored.carrinho.push({
					totalPrice: Number((this.produto.price * this.quantity).toFixed(2)),
					totalQuantity: this.quantity,
					id: this.produto.id,
					description: this.produto.description,
					price: this.produto.price,
					quantity: this.produto.quantity,
				})
			}
			localStorage.setItem('pratas:carrinho', JSON.stringify({ carrinho: stored.carrinho }))
			this.$emit('ok', [this.produto.id, this.quantity])
			this.hide()
		},

		show() {
			;(this.$refs.dialog as QDialog).show()
		},
		hide() {
			;(this.$refs.dialog as QDialog).hide()
		},
	},
})
</script>
