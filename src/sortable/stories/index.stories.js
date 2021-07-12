/**
 * External dependencies
 */
import { number, boolean } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import Sortable from '../';
import GridWithState from './grid';
import ListWithState from './list';

const RANGE_CONFIG = { min: 1, step: 1, max: 15, range: true };

export default {
	title: 'Components/Sortable',
	component: Sortable,
	parameters: {
		docs: {
			description: {
				component: 'A higher-order component to turn any collection of elements given into a touch-friendly sortable list.',
			},
		},
	},
};

export const grid = () => {
	const length = number( 'Number of items', 12, RANGE_CONFIG );
	return <GridWithState length={ length } />;
};

export const list = () => {
	const length = number( 'Number of items', 8, RANGE_CONFIG );
	const withKnobs = boolean( 'Drag knobs', true );
	return <ListWithState length={ length } withKnobs={ withKnobs } />;
};
