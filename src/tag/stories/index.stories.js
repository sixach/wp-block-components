/**
 * External dependencies
 */
import size from 'lodash/size';

/**
 * Internal dependencies
 */
import Tag from '../';
import DefaultWithState from './components/DefaultWithState';
import OrderableWithState from './components/OrderableWithState';
import list from '../../utils/list';

export default {
	title: 'Components/Tag',
	component: Tag,
	argTypes: {
		className: {
			table: {
				disable: true,
			},
		},
		label: {
			table: {
				disable: true,
			},
		},
		length: {
			control: {
				max: size( list ),
				min: 1,
				step: 1,
				type: 'range',
			},
			defaultValue: 10,
			name: 'Number of tags',
			type: {
				name: 'number',
			},
		},
		list: {
			defaultValue: list,
			table: {
				disable: true,
			},
		},
		screenReaderText: {
			table: {
				disable: true,
			},
		},
		onRemove: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: 'Tag element with a remove button.',
			},
		},
	},
};

export const _default = ( props ) => <DefaultWithState { ...props } />;
export const sortable = ( props ) => <OrderableWithState { ...props } />;
