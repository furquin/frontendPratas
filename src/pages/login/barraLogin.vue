<template>
	<main class="fullscreen is-one-third row column justify-center items-center bg-primary">
		<section>
			<form @submit.prevent="entrar">
				<div>
					<label class="label">Email</label>
					<input class="input" v-model="email" type="text" placeholder="nome@email.com" required />
				</div>

				<div class="mt-5">
					<label class="label">Senha</label>
					<input class="input" v-model="senha" type="password" placeholder="Sua senha" required />
				</div>
				<div class="has-text-centered mt-5">
					<button class="button bg-grey-8 text-white">Entrar</button>
				</div>
			</form>
		</section>
	</main>
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
