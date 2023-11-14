<template>
	<q-dialog ref="dialog">
		<q-card style="width: 50%">
			<q-card-section class="row justify-center">
				<h5 class="text-secondary">Esta é uma ação irreversível!</h5>
			</q-card-section>
			<q-card-section class="row justify-center">
				<div class="text-negative">Tem certeza que deseja deletar este produto?</div>
			</q-card-section>
			<q-card-actions class="row justify-around">
				<q-btn flat label="Cancelar" color="info" v-close-popup></q-btn>
				<q-btn flat label="Deletar" color="negative" @click="deletarProduto()"></q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { QDialog } from 'quasar'
import { useProdutoStore } from '@/store/produto.store'
import { Produto } from '@/types'

const $produtoStore = useProdutoStore()

export default defineComponent({
	name: 'DialogDeletarProduto-componente',
	props: {
		produto: {
			type: Object as () => Produto,
			required: true,
		},
	},
	methods: {
		async deletarProduto() {
			await $produtoStore.deleteProduto(this.produto.id)
			this.$emit('ok')
			this.hide()
		},
		hide() {
			;(this.$refs.dialog as QDialog).hide()
		},
	},
})
</script>
