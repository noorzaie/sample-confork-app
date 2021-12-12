module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'airbnb-base'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		indent: [ 'error', 'tab', { SwitchCase: 1 } ],
		'no-tabs': 'off',
		'comma-dangle': [ 'error', 'never' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'object-curly-spacing': [ 'error', 'always' ],
		'linebreak-style': 'off',
		'import/extensions': [ 'error', 'ignorePackages', { ts: 'never', js: 'never' } ],
		'no-restricted-syntax': 'off',
		'object-curly-newline': 'off',
		'no-console': [ 'warn' ],
		'max-len': [ 'warn', 150 ],
		'import/prefer-default-export': 'off',
		'no-nested-ternary': 'off',
		'no-param-reassign': 'off',
		'no-await-in-loop': 'off',
		'arrow-body-style': 'off',
		'no-else-return': 'warn',
		'no-use-before-define': 'off',
		'no-underscore-dangle': 'off',
		'no-useless-constructor': 'off',
		'no-empty-function': 'off',
		'global-require': 'off',
		'import/no-dynamic-require': 'off',
		'arrow-parens': 'off',
		// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
		'@typescript-eslint/explicit-member-accessibility': [ 'error' ],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [ 'error' ],
		'@typescript-eslint/no-useless-constructor': [ 'error' ],
		'@typescript-eslint/no-empty-function': [ 'error' ]
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: [ '.ts' ]
			}
		}
	}
};
