module.exports = {
	stories: [ process.env.NODE_ENV !== 'test' && '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
	addons: [
		{
			name: '@storybook/addon-docs',
			options: { configureJSX: true },
		},
		'@storybook/addon-knobs',
		'@storybook/addon-viewport',
		'@storybook/addon-a11y',
	],
};
