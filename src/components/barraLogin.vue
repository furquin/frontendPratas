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
import axiosRequest from '@/resource/axios'

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
			const { data, ...request } = await axiosRequest.post('/login', {
				email: this.email,
				password: this.senha,
			})
			if (request.status === 200) {
				localStorage.setItem('token', data.token)
			} else {
				alert('Email ou senha incorretos')
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
