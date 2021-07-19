/**
 * External dependencies
 */
import { text, number, boolean } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import MultiSelect from '../';
import DefaultWithState from './default';
import defaultMessages from '../messages';

const RANGE_CONFIG = { min: 1, step: 1, max: 123, range: true };

export default {
	title: 'Components/MultiSelect',
	component: MultiSelect,
	parameters: {
		docs: {
			description: {
				component: 'A multiple selection dropdown component with checkboxes, search and select-all.',
			},
		},
	},
};

export const _default = () => {
	const withSearchField = boolean( 'Search form?', true );
	const withSelectAll = boolean( 'Select all?', true );
	const searchFormLabel = text( 'Search label', defaultMessages?.search );
	const noResultsText = text( 'No results', defaultMessages?.noResults );
	const length = number( 'Options', 12, RANGE_CONFIG );

	return (
		<DefaultWithState
			length={ length }
			withSearchField={ withSearchField }
			withSelectAll={ withSelectAll }
			messages={ { noResults: noResultsText, search: searchFormLabel } }
		/>
	);
};
