/**
 * External dependencies
 */
import { number } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import Tag from '../';
import DefaultWithState from './default';
import OrderableWithState from './orderable';

const RANGE_CONFIG = { min: 1, step: 1, max: 123, range: true };

export default {
	title: 'Components/Tag',
	component: Tag,
	parameters: {
		docs: {
			description: {
				component: 'Tag element with a remove button.',
			},
		},
	},
};

export const _default = () => {
	const length = number( 'Number of tags', 10, RANGE_CONFIG );
	return <DefaultWithState length={ length } />;
};

export const sortable = () => {
	const length = number( 'Number of tags', 20, RANGE_CONFIG );
	return <OrderableWithState length={ length } />;
};
