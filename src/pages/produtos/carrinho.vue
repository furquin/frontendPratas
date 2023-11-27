<template>
	<q-page class="row q-pl-md q-pr-sm">
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
			class="col-9"
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
		</q-table>
		<div class="column col-3">
			<q-select v-model="selected" label="Forma de pagamento" :options="paymentMethods" map-options emit-value>
			</q-select>
			<q-separator> </q-separator>
			<div class="row">
				<q-checkbox v-model="prestacao" label="Compra parcelada" />
			</div>
			<div class="column" v-if="prestacao">
				<div class="row justify-center items-center">
					<q-item class="col-10 justify-center items-end"> N° de parcelas: </q-item>
					<q-input type="number" class="col-2 items-end" v-model="NumeroDeParcelas" />
				</div>
				<div class="row justify-center items-center">
					<q-item class="col-10 justify-center items-end"> Valor da parcela: </q-item>
					<q-item class="col-2 items-end">{{ Number((valorTotal / NumeroDeParcelas).toFixed(2)) }}</q-item>
				</div>
			</div>
			<div v-if="!prestacao" class="row justify-center items-center">
				<q-item class="col-10 justify-center items-end"> Valor total: </q-item>
				<q-item class="col-2 items-end">{{ valorTotal }}</q-item>
			</div>
			<div>
				<q-btn @click="finalizarCheckout" color="positive" label="Finalizar" style="width: 100%" />
			</div>
		</div>
	</q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Carrinho } from '@/types'
import { useFormasPagamentoStore } from '@/store/formas-pagamento.store'
import { useProdutoStore } from '@/store/produto.store'
import { FormaPagamento } from '@/types'

const $formasPagamentoStore = useFormasPagamentoStore()
const $produtoStore = useProdutoStore()
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
const selected = null
const prestacao = false
const NumeroDeParcelas = 1
const rows: Carrinho[] = JSON.parse(localStorage.getItem('pratas:carrinho') as string).carrinho
let valorTotal = rows.reduce((acc: number, item: Carrinho) => acc + item.totalPrice, 0) / NumeroDeParcelas
let paymentMethods: Array<object> = []

export default defineComponent({
	name: 'DialogCarrinho-componente',
	components: {},
	data() {
		return {
			columns,
			rows,
			paymentMethods,
			prestacao,
			NumeroDeParcelas,
			valorTotal,
			selected,
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
				this.valorTotal = this.atualizaValorTotal()
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
						this.valorTotal = this.atualizaValorTotal()
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
			this.valorTotal = this.atualizaValorTotal()
		},
		atualizaValorTotal() {
			return this.rows.reduce((acc: number, item: Carrinho) => acc + item.totalPrice, 0)
		},
		async finalizarCheckout() {
			const checkout = await $produtoStore.finishCheckout({
				paymentId: Number(this.selected),
				installment: this.prestacao,
				installmentsNumber: Number(this.NumeroDeParcelas),
				totalPriceOrder: this.valorTotal,
				products: this.rows.map((item: Carrinho) => ({
					id: item.id,
					quantity: item.totalQuantity,
				})),
			})

			if (checkout) {
				this.$q.notify({
					color: 'positive',
					message: `Compra finalizada com sucesso!`,
				})
				this.$router.push({ name: 'checkout' })
				localStorage.setItem('pratas:carrinho', JSON.stringify({ carrinho: [] }))
				this.rows = JSON.parse(localStorage.getItem('pratas:carrinho') as string).carrinho
				this.valorTotal = this.atualizaValorTotal()
			}
		},
	},
	async created() {
		const carrinho = localStorage.getItem('pratas:carrinho')
		if (carrinho) {
			this.rows = JSON.parse(carrinho).carrinho
			this.valorTotal = this.atualizaValorTotal()
		} else {
			localStorage.setItem('pratas:carrinho', JSON.stringify({ carrinho: [] }))
		}

		const formasPagamento = await $formasPagamentoStore.findAll()
		this.paymentMethods = formasPagamento.map((formaPagamento: FormaPagamento) => ({
			label: formaPagamento.name,
			value: formaPagamento.id,
		}))
	},
})
</script>
<style scoped></style>
