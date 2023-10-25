export interface IProduto {
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
