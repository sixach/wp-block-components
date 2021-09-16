/**
 * Internal dependencies
 */
import Loading from '../';

export default {
	title: 'Components/Loading',
	component: Loading,
	argTypes: {
		className: {
			table: {
				disable: true,
			},
		},
		label: {
			defaultValue: 'Fetching',
			type: { name: 'string' },
		},
	},
	parameters: {
		docs: {
			description: {
				component: 'Spinners notify users that their action is being processed.',
			},
		},
	},
};

export const _default = ( props ) => <Loading { ...props } />;
