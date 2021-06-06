/**
 * The styled API for @emotion/react.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

import { indexOf, get, escapeRegExp, invoke, filter, map, some, remove } from 'lodash';

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
import { useState, useEffect, useRef, RawHTML } from '@wordpress/element';

import Item from './item';
import Tag from '../tag';
import { ComponentWrapper } from "./style";


function MultiSelect({ items, selectedItems, groups, selectedGroups, onChange, className }) {
	const [ searchText, setSearchText ] = useState( '' );

	const filteredOptions = () => {
		// bail early in case there is no search term entered.
		if ( ! searchText.length ) {
			return items;
		}
		const pattern = new RegExp( escapeRegExp( searchText ), 'i' );
		return filter( items, ({ label }) => invoke( label, 'match', pattern ) );
	};

	const isItemSelected = ( itemValue ) => {
		return some( selectedItems, [ 'value', itemValue ] );
	};

	const areAllItemsSelected = selectedItems.length === items.length;

	const handleChangeSelectAll = () => {
		if ( areAllItemsSelected ) {
			onChange( [] );
		} else {
			onChange( items );
		}
	}

	const toggleItemInSelectedItems = ( item ) => {
		if ( isItemSelected( get( item, 'value' ) ) ) {
			return filter( selectedItems, ({ value }) => value !== get( item, 'value' ) );
		}
		return [ ...selectedItems, item ];
	}

	return (
		<ComponentWrapper>
			{ !! selectedItems.length && (
				<ul>
					{ map( selectedItems, ({ value, label }) => (
						<li key={value}>
							{ label }
						</li>
					))}
				</ul>
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
								onChange={ handleChangeSelectAll }
								label={ __( 'Select all', 'sixa' ) }
							/>
						</li>
					)}
					{ map( filteredOptions(), ({ value, label }) => (
						<li key={ value }>
							<CheckboxControl
								type="checkbox"
								checked={ isItemSelected( value ) }
								onChange={ () => onChange( toggleItemInSelectedItems( { value, label } ) ) }
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
