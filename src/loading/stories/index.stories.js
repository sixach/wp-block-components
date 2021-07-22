/**
 * External dependencies
 */
import { text } from '@storybook/addon-knobs';

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

export const _default = () => {
	const label = text( 'Label', 'Fetching…' );

	return <Loading label={ label } />;
};
