<template>
	<q-dialog ref="dialog">
		<q-card style="width: 50%">
			<q-card-section class="row justify-center">
				<h5 class="text-black">Adicionar ao carrinho</h5>
			</q-card-section>
			<q-card-section class="row justify-center">
				<div class="text-positive">Deseja adicionar o produto {{ this.produto.name }} ao carrinho?</div>
			</q-card-section>
			<q-card-section>
				<q-input color="info" filled v-model.number="quantity" label="Quantidade" class="q-mb-md q-pa-md"> </q-input>
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
import { IProduto } from '../interfaces/produto.interface'
export default defineComponent({
	name: 'DialogAdicionarProdutoCarrinho-componente',
	data() {
		return {
			carrinho: [],
			quantity: 1,
		}
	},
	props: {
		produto: {
			type: Object as () => IProduto,
			required: true,
		},
	},
	methods: {
		async adicionarProduto() {
			this.carrinho.push({
				id: this.produto.id,
				name: this.produto.name,
				price: this.produto.price,
				quantity: this.quantity,
			} as never)
			this.$emit('ok')
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
