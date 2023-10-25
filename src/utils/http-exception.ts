import { Notify } from 'quasar'

export function HttpException(data: any) {
	if (Array.isArray(data.message)) {
		data.message = data.message.at(0)
	}

	Notify.create({
		message: data.message || 'Erro desconhecido!',
		type: 'negative',
		html: true,
	})
}
