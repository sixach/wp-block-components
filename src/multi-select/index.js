/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { get, escapeRegExp, invoke, filter, map, some, find, concat } from 'lodash';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { TextControl, CheckboxControl } from '@wordpress/components';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 */
import { removeAtIndex } from '@sixach/wp-block-utils/src';

/**
 * The styled components generated using @emotion/react API.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import { ComponentWrapper } from './style';

/**
 * List of tags to display the selected options.
 *
 * @ignore
 */
import SelectedTagList from './selected-tag-list';

/**
 * MultiSelect component designed to provide the ability to search for and select any number of options from
 * a set of { label, value } pairs in any order.
 *
 * Interface details:
 * MultiSelect expects a list of { label, value } pairs for the options that are displayed. Whenever an option
 * is selected or unselected, MultiSelect calls the `onChange` callback with the values of the selected options
 * only. That is, `selectedOptions` is an array of values only, not an array of { label, value } pairs.
 *
 * @function
 * @since 	1.0.0
 * @param  	{Object}      		props                           The props that were defined by the caller of this component.
 * @param 	{Array} 			props.options					Set of { label, value } pairs that can be selected.
 * @param 	{Array} 			props.selectedOptions			List of values of the options that are currently selected.
 * @param 	{Function}			props.onChange					Callback function to be triggered when the selected options change.
 * @return 	{JSX.Element}										MultiSelect component.
 * @example
 *
 * <MultiSelect
 *		options={ [{ value: 100, label: 'My blog post' }, { value: 108, label: 'My other blog post' }] }
 *		selectedOptions={ postIds }
 *		onChange={( items ) => {
 *			setAttributes({ postIds: map( items, ({ value }) => value ) });
 *		} }
 * />
 *
 * // => Array [ 100, 108 ]
 */
function MultiSelect( { options, selectedOptions, onChange } ) {
	const [ searchText, setSearchText ] = useState( '' );
	const [ selected, setSelected ] = useState( [] );

	// Build options from selected ids. Allows us to persist order in which items are selected
	// and enables drag & drop support (for ordering) by moving the order logic into MultiSelect.
	// Without this, parent components would be required to pass `selectedOptions` in the correct
	// order, which may or may not introduce huge complexities depending on the data being passed.
	useEffect( () => {
		setSelected( map( selectedOptions, ( value ) => find( options, [ 'value', value ] ) ) );
	}, [ selectedOptions ] );

	const filteredOptions = () => {
		// Bail early in case there is no search term entered.
		if ( ! searchText.length ) {
			return options;
		}
		const pattern = new RegExp( escapeRegExp( searchText ), 'i' );
		return filter( options, ( { label } ) => invoke( label, 'match', pattern ) );
	};

	const isOptionSelected = ( optionValue ) => {
		return some( selected, [ 'value', optionValue ] );
	};

	const areAllOptionsSelected = selected.length === options.length;
	const selectionMessage = sprintf(
		/* translators: Number of options selected from list. */
		_n( '%d item selected', '%d items selected', selectedOptions.length, 'sixa' ),
		selected.length
	);

	const handleOnChangeSearchText = ( value ) => {
		setSearchText( value );
	};

	const handleOnClickTagButton = ( optionIndex ) => {
		onChange( removeAtIndex( selected, optionIndex ) );
	};

	const handleOnChangeSelectAll = () => {
		if ( ! areAllOptionsSelected ) {
			onChange( options );
		} else {
			onChange( [] );
		}
	};

	const handleOnChangeOption = ( option ) => {
		if ( isOptionSelected( get( option, 'value' ) ) ) {
			onChange( filter( selected, ( { value } ) => value !== get( option, 'value' ) ) );
		} else {
			onChange( concat( selected, option ) );
		}
	};

	return (
		<ComponentWrapper>
			<p>
				<strong>{ selectionMessage }</strong>
			</p>
			{ !! selected.length && <SelectedTagList items={ selected } onRemove={ handleOnClickTagButton } /> }
			<TextControl label={ __( 'Search for items to display', 'sixa' ) } type="search" value={ searchText } onChange={ handleOnChangeSearchText } />
			{ !! searchText.length && ! filteredOptions().length ? (
				<p>{ __( 'No results found for your search term', 'sixa' ) }</p>
			) : (
				<ul>
					{ ! searchText.length && (
						<li>
							<CheckboxControl
								type="checkbox"
								checked={ areAllOptionsSelected }
								onChange={ handleOnChangeSelectAll }
								/* translators: Number of options selected from list. */
								label={ sprintf( __( 'Select all (%d)', 'sixa' ), options.length ) }
							/>
						</li>
					) }
					{ map( filteredOptions(), ( { value, label } ) => (
						<li key={ value }>
							<CheckboxControl
								type="checkbox"
								checked={ isOptionSelected( value ) }
								onChange={ () => handleOnChangeOption( { value, label } ) }
								label={ label }
							/>
						</li>
					) ) }
				</ul>
			) }
		</ComponentWrapper>
	);
}

export default MultiSelect;
