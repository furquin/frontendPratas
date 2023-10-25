module.exports = {
	root: true,
	env: {
		node: true,
		jest: true,
	},
	extends: ['plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2020,
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		'@typescript-eslint/ban-types': 'off',
	},
}
