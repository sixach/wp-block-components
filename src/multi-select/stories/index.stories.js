/**
 * External dependencies
 */
import size from 'lodash/size';

/**
 * Internal dependencies
 */
import MultiSelect from '../';
import DefaultWithState from './components/DefaultWithState';
import defaultMessages from '../messages';
import list from '../../utils/list';

export default {
	title: 'Components/MultiSelect',
	component: MultiSelect,
	argTypes: {
		aria: {
			table: {
				disable: true,
			},
		},
		className: {
			table: {
				disable: true,
			},
		},
		messages: {
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
			defaultValue: 12,
			name: 'Options',
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
		onChange: {
			table: {
				disable: true,
			},
		},
		noResultsText: {
			description: 'No results',
			defaultValue: defaultMessages?.noResults,
			type: {
				name: 'string',
			},
		},
		options: {
			table: {
				disable: true,
			},
		},
		searchFormLabel: {
			description: 'Search label',
			defaultValue: defaultMessages?.search,
			type: {
				name: 'string',
			},
		},
		selectedOptions: {
			table: {
				disable: true,
			},
		},
		withSearchField: {
			description: 'Search form?',
			defaultValue: true,
		},
		withSelectAll: {
			description: 'Select all?',
			defaultValue: true,
		},
	},
	parameters: {
		docs: {
			description: {
				component: 'A multiple selection dropdown component with checkboxes, search and select-all.',
			},
		},
	},
};

export const _default = ( { noResultsText, searchFormLabel, ...otherProps } ) => (
	<DefaultWithState messages={ { noResults: noResultsText, search: searchFormLabel } } { ...otherProps } />
);
