<template>
	<q-dialog>
		<q-card style="width: 50%">
			<q-card-section class="row justify-center">
				<h3 class="text-secondary">Editar produto</h3>
			</q-card-section>
			<q-input color="info" filled v-model="name" label="Nome" class="q-mb-md q-pa-md"> </q-input>
			<q-input color="info" filled v-model="description" label="descrição" class="q-mb-md q-pa-md"> </q-input>
			<q-input color="info" filled v-model.number="price" label="Preço" class="q-mb-md q-pa-md"> </q-input>
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
import axiosRequest from '@/resource/axios'
import { HttpException } from '@/utils/http-exception'
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
			await axiosRequest
				.patch(`/products/${this.produto.id}`, {
					name: this.name,
					description: this.description,
					price: this.price,
					quantity: this.quantity,
					barCode: this.barCode,
				})
				.then(() => {
					this.$q.notify({
						color: 'positive',
						message: 'Produto editado com sucesso!',
					})
					setTimeout(() => {
						window.location.reload()
					}, 1000)
				})
				.catch((error) => {
					HttpException(error)
				})
		},
	},

	async created() {
		const response = await axiosRequest.get(`/products/${this.produto.id}`).catch((error) => {
			HttpException(error)
		})
		if (!response) return
		this.name = response.data.name
		this.description = response.data.description
		this.price = response.data.price
		this.quantity = response.data.quantity
		this.barCode = response.data.barCode
	},
})
</script>
