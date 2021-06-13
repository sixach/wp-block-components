/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { get, escapeRegExp, invoke, filter, map, some, find, concat, assign } from 'lodash';

/**
 * React hook for value and callback debouncing.
 *
 * @see https://github.com/xnimorz/use-debounce
 */
import { useDebouncedCallback } from 'use-debounce';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 * @ignore
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 * @ignore
 */
import { TextControl, CheckboxControl, Button } from '@wordpress/components';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 * @ignore
 */
import { useState, useEffect, useMemo } from '@wordpress/element';

/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 */
import { removeAtIndex } from '@sixach/wp-block-utils/src';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see 	https://www.npmjs.com/package/@emotion/styled
 * @ignore
 */
import { ComponentWrapper } from './style';

/**
 * List of tags to display the selected options.
 *
 * @ignore
 */
import SelectedTagList from './selected-tag-list';

/**
 * Default messages for labels and notices.
 *
 * @ignore
 */
import defaultMessages from './messages';

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
 * @since		1.1.0
 * @param		{Object}		props                       The props that were defined by the caller of this component.
 * @param		{Array}			props.options 				Set of { label, value } pairs that can be selected.
 * @param		{Array}			props.selectedOptions		List of values of the options that are currently selected.
 * @param		{Function}		props.onChange 				Callback function to be triggered when the selected options change.
 * @param		{string}		props.ariaLabel				Aria-label value.
 * @param		{string} 		props.ariaDescription		Aria-description value.
 * @param		{boolean} 		props.withSearchField 		Enable search field to filter options from the list.
 * @param		{Object} 		props.messages 				Labels and notices for subcomponents. Is merged with a default value.
 * @return		{JSX.Element} 								MultiSelect component.
 * @example
 *
 * <MultiSelect
 * 		options={ [{ value: 100, label: 'My blog post' }, { value: 108, label: 'My other blog post' }] }
 * 		selectedOptions={ postIds }
 * 		onChange={( items ) => {
 * 			setAttributes({ postIds: map( items, ({ value }) => value ) });
 * 		} }
 * />
 *
 * // => Array [ 100, 108 ]
 */
function MultiSelect( { options, selectedOptions, onChange, withSearchField, messages = {}, ariaLabel, ariaDescription } ) {
	const [ searchText, setSearchText ] = useState( '' );
	const [ selected, setSelected ] = useState( [] );

	const ariaAttributes = {};
	if ( !! ariaLabel ) {
		assign( ariaAttributes, { 'aria-label': ariaLabel } );
	}

	if ( !! ariaDescription ) {
		assign( ariaAttributes, { 'aria-description': ariaDescription } );
	}

	// Enable passing only a subset in `messages`.
	const mergedMessages = assign( {}, defaultMessages, messages );

	// Build options from selected ids. Allows us to persist order in which items are selected
	// and enables drag & drop support (for ordering) by moving the order logic into MultiSelect.
	// Without this, parent components would be required to pass `selectedOptions` in the correct
	// order, which may or may not introduce huge complexities depending on the data being passed.
	useEffect( () => {
		setSelected( map( selectedOptions, ( value ) => find( options, [ 'value', value ] ) ) );
	}, [ selectedOptions ] );

	const filteredOptions = useMemo( () => {
		// Bail early in case there is no search term entered.
		if ( ! searchText.length ) {
			return options;
		}
		const pattern = new RegExp( escapeRegExp( searchText ), 'i' );
		return filter( options, ( { label } ) => invoke( label, 'match', pattern ) );
	}, [ searchText ] );

	const isOptionSelected = ( optionValue ) => {
		return some( selected, [ 'value', optionValue ] );
	};

	const areAllOptionsSelected = selected.length === options.length;

	const handleOnChangeSearchText = useDebouncedCallback( ( value ) => {
		setSearchText( value );
	}, 500 );

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

	const handleOnClickClearAllButton = () => {
		onChange( [] );
	};

	return (
		<ComponentWrapper className="sixa-component-multiselect" { ...ariaAttributes }>
			<p>
				<strong>{ mergedMessages.selected( selected.length ) }</strong>
				{ !! selected.length && (
					<Button
						className="sixa-component-multiselect__clear-all-button"
						isDestructive
						text={ __( 'Clear all', 'sixa' ) }
						onClick={ handleOnClickClearAllButton }
						aria-label={ __( 'Clear all selected items', 'sixa' ) }
					/>
				) }
			</p>
			{ !! selected.length && <SelectedTagList items={ selected } onRemove={ handleOnClickTagButton } /> }
			{ withSearchField && <TextControl label={ mergedMessages.search } type="search" onChange={ handleOnChangeSearchText } /> }
			{ !! searchText.length && ! filteredOptions.length ? (
				<p>{ mergedMessages.noResults }</p>
			) : (
				<ul className="sixa-component-multiselect__option-list">
					{ ! searchText.length && (
						<li>
							<CheckboxControl
								checked={ areAllOptionsSelected }
								onChange={ handleOnChangeSelectAll }
								/* translators: Number of options selected from list. */
								label={ sprintf( __( 'Select all (%d)', 'sixa' ), options.length ) }
							/>
						</li>
					) }
					{ map( filteredOptions, ( { value, label }, index ) => (
						<li key={ index }>
							<CheckboxControl
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
