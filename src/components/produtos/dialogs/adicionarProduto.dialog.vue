<template>
	<q-dialog ref="dialog">
		<q-card style="width: 50%">
			<q-card-section class="row justify-center">
				<h3 class="text-secondary">Novo produto</h3>
			</q-card-section>
			<q-input color="info" filled v-model="name" label="Nome" class="q-mb-md q-pa-md"> </q-input>
			<q-input color="info" filled v-model="description" label="descrição" class="q-mb-md q-pa-md"> </q-input>
			<q-input
				color="info"
				filled
				v-model.decimal="price"
				label="Preço"
				mask="#.##"
				fill-mask="0"
				:prefix="'R$'"
				reverse-fill-mask
				class="q-mb-md q-pa-md"
			>
			</q-input>
			<q-input color="info" filled v-model.number="quantity" label="Quantidade" class="q-mb-md q-pa-md"> </q-input>
			<q-input color="info" filled v-model="barCode" label="Código" class="q-mb-md q-pa-md"> </q-input>
			<q-card-actions class="row justify-around">
				<q-btn flat label="Cancelar" @click="hide" color="negative"></q-btn>
				<q-btn flat label="Adicionar" color="info" @click="criarProduto"></q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { QDialog } from 'quasar'
import { useProdutoStore } from '@/store/produto.store'

const $produtoStore = useProdutoStore()

export default defineComponent({
	name: 'DialogAdicionarProduto-componente',
	components: {},
	data() {
		return {
			name: '',
			description: '',
			price: 0.0,
			quantity: 0,
			barCode: '',
		}
	},
	methods: {
		async criarProduto() {
			await $produtoStore.createProduto({
				name: this.name,
				description: this.description,
				price: this.price,
				quantity: this.quantity,
				barCode: this.barCode,
			})

			this.$q.notify({
				color: 'positive',
				message: 'Produto adicionado com sucesso!',
			})
			this.name = ''
			this.description = ''
			this.price = 0
			this.quantity = 0
			this.barCode = ''
		},
		hide() {
			;(this.$refs.dialog as QDialog).hide()
		},
	},
})
</script>
