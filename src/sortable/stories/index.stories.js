/**
 * Internal dependencies
 */
import Sortable from '../';
import GridWithState from './components/GridWithState';
import ListWithState from './components/ListWithState';

export default {
	title: 'Components/Sortable',
	component: Sortable,
	argTypes: {
		className: {
			table: {
				disable: true,
			},
		},
		children: {
			table: {
				disable: true,
			},
		},
		draggedItemClassName: {
			table: {
				disable: true,
			},
		},
		length: {
			control: {
				max: 15,
				min: 1,
				step: 1,
				type: 'range',
			},
			defaultValue: 12,
			name: 'Number of items',
			type: {
				name: 'number',
			},
		},
		onChange: {
			table: {
				disable: true,
			},
		},
		withSortableKnob: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: 'A higher-order component to turn any collection of elements given into a touch-friendly sortable list.',
			},
		},
	},
};

export const grid = ( props ) => <GridWithState { ...props } />;
export const list = ( props ) => <ListWithState { ...props } />;

list.argTypes = {
	...list.argTypes,
	withKnobs: {
		control: {
			type: 'boolean',
		},
		defaultValue: true,
		name: 'Drag knobs',
	},
};
