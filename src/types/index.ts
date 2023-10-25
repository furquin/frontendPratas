export type User = {
	id: number
	name: string
	email: string
	active: boolean
	role?: Role
}

export type Role = {
	id: number
	name: string
	slug: string
}
