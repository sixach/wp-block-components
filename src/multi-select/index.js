/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { get, escapeRegExp, invoke, filter, map, some, find } from 'lodash';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

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
import { removeAtIndex } from "@sixach/wp-block-utils/src";

/**
 * The styled components generated using @emotion/react API.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import { ComponentWrapper } from "./style";

/**
 * List of tags to display the selected options.
 *
 * @ignore
 */
import SelectedTagList from "./selected-tag-list";


function MultiSelect({ items, selectedItems, groups, selectedGroups, onChange, className }) {
	const [ searchText, setSearchText ] = useState( '' );
	const [ selected, setSelected ] = useState( [] );

	// initially set selected items in state to selected items from props.
	useEffect( () => {
		setSelected( map( selectedItems, ( value ) => find( items, [ 'value', value ] ) ) );
	}, [] );

	useEffect( () => {
		onChange( selected );
	}, [ selected ] );

	const filteredOptions = () => {
		// bail early in case there is no search term entered.
		if ( ! searchText.length ) {
			return items;
		}
		const pattern = new RegExp( escapeRegExp( searchText ), 'i' );
		return filter( items, ({ label }) => invoke( label, 'match', pattern ) );
	};

	const isItemSelected = ( itemValue ) => {
		return some( selected, [ 'value', itemValue ] );
	};

	const areAllItemsSelected = selected.length === items.length;

	const handleOnClickTagButton = ( index ) => {
		console.log({ index });
		setSelected( removeAtIndex( selected, index ) );
	}

	const handleOnChangeSelectAll = () => {
		let newSelected = [];
		if ( ! areAllItemsSelected ) {
			newSelected = items;
		}
		setSelected( newSelected );
	}

	const handleOnChangeOption = ( item ) => {
		let newSelected = [ ...selected, item ];
		if ( isItemSelected( get( item, 'value' ) ) ) {
			newSelected = filter( selected, ({ value }) => value !== get( item, 'value' ) );
		}
		setSelected( newSelected );
	}

	return (
		<ComponentWrapper>
			{ !! selected.length && (
				<SelectedTagList items={ selected } onRemove={ handleOnClickTagButton } />
			)}
			<TextControl
				label={ __( 'Search for items to display', 'sixa' ) }
				type="search"
				value={ searchText }
				onChange={ setSearchText }
			/>
			{ !! searchText.length && ! filteredOptions().length ? (
				<p>{ __( 'No resuls found for your search term', 'sixa' ) }</p>
			) : (
				<ul>
					{ ! searchText.length && (
						<li>
							<CheckboxControl
								type="checkbox"
								checked={ areAllItemsSelected }
								onChange={ handleOnChangeSelectAll }
								label={ __( 'Select all', 'sixa' ) }
							/>
						</li>
					)}
					{ map( filteredOptions(), ({ value, label }) => (
						<li key={ value }>
							<CheckboxControl
								type="checkbox"
								checked={ isItemSelected( value ) }
								onChange={ () => handleOnChangeOption( { value, label } ) }
								label={ label }
							/>
						</li>
					))}
				</ul>
			)}
		</ComponentWrapper>
	);
}

export default MultiSelect;
