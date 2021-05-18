const eslintConfig = {
	root: true,
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	rules: {
		'import/no-unresolved': 'off',
	},
};

module.exports = eslintConfig;
