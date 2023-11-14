<template>
	<div class="col-s-2 bg-grey-2" padding>
		<div class="row justify-center">
			<div class="col-s-2">
				<h3>carrinho</h3>
			</div>
		</div>
		<div>
			<div>
				<b-table>
					<template>
						<b-button variant="danger" size="sm"> Remover </b-button>
					</template>
				</b-table>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Carrinho-componente',
	data() {
		return {
			carrinho: [],
		}
	},
	methods: {
		removerProduto() {
			console.log('remover')
		},
	},
})
</script>

<style></style>
