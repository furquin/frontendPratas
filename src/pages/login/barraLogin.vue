<template>
	<div class="fullscreen bg-primary">
		<div class="fullscreen is-one-third row column justify-center items-center bg-white">
			<section>
				<form @submit.prevent="entrar">
					<div>
						<div class="text-weight-bold">Email</div>
						<q-input v-model="email" type="text" placeholder="nome@email.com" required />
					</div>

					<div class="mt-5">
						<div class="text-weight-bold">Senha</div>
						<q-input v-model="senha" type="password" placeholder="Sua senha" required />
					</div>
					<section class="row justify-around">
						<div class="has-text-centered mt-5">
							<button class="button bg-grey-8 text-white">Entrar</button>
						</div>
						<div class="has-text-centered mt-5">
							<router-link to="/cadastro" class="button bg-grey-8 text-white"> Cadastre-se </router-link>
						</div>
					</section>
				</form>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/auth.store'

const $authStore = useAuthStore()

export default defineComponent({
	name: 'Barra-login-componente',
	components: {},
	data() {
		return {
			email: '',
			senha: '',
		}
	},
	methods: {
		async entrar() {
			const success = await $authStore.login(this.email, this.senha)
			if (success) {
				this.$router.push({ name: 'home' })
			}
		},
	},
})
</script>

<style scoped>
section {
	width: 90%;
}
</style>
