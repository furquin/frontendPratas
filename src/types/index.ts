export type User = {
	id: number
	name: string
	email: string
	active: boolean
	role: Role
}

export type Role = string

export type Produto = {
	id: number
	name: string
	description: string
	price: number
	quantity: number
	image: string
	categoryId: number
	barCode: string
	size: string
	createdAt: Date
	updatedAt: Date
}

export type Carrinho = {
	id: number
	description: number
	quantity: number
	price: number
	totalPrice: number
	totalQuantity: number
}

export type FormaPagamento = {
	id: number
	name: string
}
