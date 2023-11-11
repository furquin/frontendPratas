import { Notify } from 'quasar'
import router from '../routers/index'

export function HttpException(data: any) {
	if (Array.isArray(data.message)) {
		data.message = data.message.at(0)
	}

	if (data.response.data.statusCode === 403) {
		router.push('/')
		Notify.create({
			message: 'Acesso negado!',
			type: 'negative',
			html: true,
		})
	} else {
		Notify.create({
			message: data.response.data.message || 'Erro desconhecido!',
			type: 'negative',
			html: true,
		})
	}
}
