<template>
	<div class="bg-primary window-height row flex-center">
		<main class="row items-center q-col-gutter-md" style="max-width: 1250px">
			<q-item clickable class="absolute-top-left row column" @click="$router.push({ name: 'login' })">
				<q-icon name="home" size="2rem" />
				<div class="text-black-light">Voltar</div>
			</q-item>
			<div class="col-xs-12 col-md-12">
				<section class="bg-white q-pa-xl rounded-borders">
					<q-form class="column q-gutter-lg" @submit.prevent="onSubmit()">
						<div>
							<div class="column q-gutter-sm">
								<div>
									<div class="text-dark text-24 text-weight-medium">Empresa</div>
									<div class="text-black-light">Preencha com os dados da sua empresa e/ou time.</div>
								</div>

								<div>
									<div class="column q-gutter-sm">
										<div>
											<div class="text-weight-bold">Nome</div>
											<q-input
												class="label"
												v-model="formData.storeName"
												:rules="[(v) => v.length >= 5 || 'O nome deve ter pelo menos 5 caracteres.']"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div>
							<div class="column q-gutter-sm">
								<div>
									<div class="text-dark text-24 text-weight-medium">Usuário</div>
									<div class="text-black-light">Preencha com seus dados pessoais para ter acesso à conta.</div>
								</div>

								<div>
									<div class="column q-gutter-sm">
										<div>
											<div class="text-weight-bold">Nome</div>
											<q-input
												v-model="formData.name"
												:rules="[(v) => v.length >= 5 || 'O nome deve ter pelo menos 5 caracteres.']"
											/>
										</div>

										<div>
											<div class="text-weight-bold">E-mail</div>
											<q-input v-model="formData.email" :rules="[(v) => isEmail(v) || 'E-mail inválido.']" />
										</div>

										<div>
											<div class="text-weight-bold">Senha</div>
											<q-input
												:type="formData.password.visible ? 'text' : 'password'"
												v-model="formData.password.value"
												:rules="[validatePassword]"
											>
												<template v-slot:append>
													<q-icon
														:name="formData.password.visible ? 'visibility' : 'visibility_off'"
														class="cursor-pointer"
														@click="formData.password.visible = !formData.password.visible"
													/>
												</template>
											</q-input>
										</div>

										<div>
											<div class="text-weight-bold">Confirme sua senha</div>
											<q-input
												:type="formData.passwordConfirmation.visible ? 'text' : 'password'"
												v-model="formData.passwordConfirmation.value"
												:rules="[
													(v) => !!v.length || 'Campo obrigatório.',
													(v) => v === formData.password.value || 'As senhas não conferem.',
												]"
											>
												<template v-slot:append>
													<q-icon
														:name="formData.passwordConfirmation.visible ? 'visibility' : 'visibility_off'"
														class="cursor-pointer"
														@click="formData.passwordConfirmation.visible = !formData.passwordConfirmation.visible"
													/>
												</template>
											</q-input>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div>
							<div class="column q-gutter-md">
								<q-btn label="Finalizar cadastro" type="submit" class="btn-info" :loading="submitting" />
							</div>
						</div>
					</q-form>
				</section>
			</div>
		</main>
	</div>
</template>

<script lang="ts">
import { useAuthStore } from '@/store/auth.store'
import { validatePassword } from '@/utils/validators'
import isEmail from 'validator/lib/isEmail'
import { ref } from 'vue'
import { defineComponent } from 'vue'

const $authStore = useAuthStore()

const submitting = ref(false)
const formData = ref({
	storeName: '',
	name: '',
	email: '',
	password: {
		value: '',
		visible: false,
	},
	passwordConfirmation: {
		value: '',
		visible: false,
	},
})

export default defineComponent({
	name: 'Cadastro-componente',
	components: {},
	data() {
		return {
			formData,
			submitting,
		}
	},
	methods: {
		async onSubmit() {
			submitting.value = true
			const success = await $authStore.register({
				storeName: formData.value.storeName,
				name: formData.value.name,
				email: formData.value.email,
				password: formData.value.password.value,
			})

			if (success) {
				this.$router.push({
					name: 'home',
				})
			}

			formData.value.storeName = ''
			formData.value.name = ''
			formData.value.email = ''
			formData.value.password.value = ''
			formData.value.passwordConfirmation.value = ''
			submitting.value = false
		},
		validatePassword,
		isEmail,
	},
})
</script>
