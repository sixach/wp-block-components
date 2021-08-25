/**
 * Internal dependencies
 */
 import Loading from '../';

export default {
	title: 'Components/Loading',
	component: Loading,
	parameters: {
		docs: {
			description: {
				component: 'Spinners notify users that their action is being processed.',
			},
		},
	},
};

export const _default = ( args ) => {
	return <Loading { ...args } />;
};

_default.args = {
	label: 'Fetching'
}
