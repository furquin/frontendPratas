<template>
	<q-dialog>
		<q-card style="width: 50%">
			<q-card-section class="row justify-center">
				<h3 class="text-secondary">Editar produto</h3>
			</q-card-section>
			<q-input color="info" filled v-model="name" label="Nome" class="q-mb-md q-pa-md"> </q-input>
			<q-input color="info" filled v-model="description" label="descrição" class="q-mb-md q-pa-md"> </q-input>
			<q-input
				label="Preço"
				color="info"
				filled
				v-model.decimal="price"
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
				<q-btn flat label="Cancelar" color="negative" v-close-popup></q-btn>
				<q-btn flat label="Salvar" color="info" @click="update" v-close-popup></q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useProdutoStore } from '@/store/produto.store'

const $produtoStore = useProdutoStore()
export default defineComponent({
	name: 'DialogEditarProduto-componente',
	components: {},
	props: {
		produto: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			name: '',
			description: '',
			price: 0,
			quantity: 0,
			barCode: '',
		}
	},
	methods: {
		async update() {
			await $produtoStore.updateProduto(this.produto.id, {
				name: this.name,
				description: this.description,
				price: this.price,
				quantity: this.quantity,
				barCode: this.barCode,
			})
			this.$q.notify({
				color: 'positive',
				message: 'Produto editado com sucesso!',
			})
		},
	},

	async created() {
		await $produtoStore.getProduto(this.produto.id)

		const response = $produtoStore.produto
		if (!response) return
		this.name = response.name
		this.description = response.description
		this.price = response.price
		this.quantity = response.quantity
		this.barCode = response.barCode
	},
})
</script>
