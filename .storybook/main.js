/**
 * External dependencies
 */
const path = require( 'path' );

const pathTo = ( to ) => path.resolve( process.cwd(), `node_modules/${ to }` );

module.exports = {
	stories: [ 'test' !== process.env.NODE_ENV && '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
	addons: [ '@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-links' ],
	webpackFinal: async ( config ) => {
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					'@emotion/core': pathTo( '@emotion/react' ),
					'@emotion/styled': pathTo( '@emotion/styled' ),
					'@emotion/styled-base': pathTo( '@emotion/styled' ),
					'emotion-theming': pathTo( '@emotion/react' ),
				},
			},
		};
	},
};
