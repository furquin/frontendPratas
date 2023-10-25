import { useAuthStore } from '@/store/auth.store'

class ACL {
	public readonly permissions = {
		'inicio.access': [],
		'produto.access': ['admin_geral', 'admin'],
	}

	hasPermission(permission_name: keyof typeof this.permissions) {
		const { user, role } = useAuthStore()

		if (!user) {
			return false
		}

		const allowedRoles = this.permissions[permission_name]

		if (!allowedRoles) {
			return false
		}

		if (allowedRoles.length === 0) {
			return true
		}

		const has = allowedRoles.some((slug) => {
			if (typeof role === 'string') {
				return role === slug
			}
			return role.slug === slug
		})

		return has
	}
}

export const acl = new ACL()
