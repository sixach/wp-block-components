/**
 * The styled API for @emotion/react.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

import { indexOf, xor, escapeRegExp, invoke, filter } from 'lodash';

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
import { TextControl, Notice } from '@wordpress/components';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { useState, useEffect, useRef, RawHTML } from '@wordpress/element';

import Item from './item';
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

	const isItemSelected = ( itemId ) => {
		return indexOf( selectedItems, itemId ) !== -1
	};

	const areAllItemsSelected = selectedItems.length === items.length;

	const handleChangeSelectAll = () => {
		if ( areAllItemsSelected ) {
			onChange([]);
		} else {
			onChange( items.map( ({ id }) => id ) );
		}
	}

	return (
		<ComponentWrapper>
			<TextControl
				label={ __( 'Search for items to display', 'sixa' ) }
				type="search"
				value={ searchText }
				onChange={ setSearchText }
			/>
			<ul>
				{ !! searchText.length && ! filteredOptions().length && (
					<li>
						<p>{ __( 'No resuls found for your search term', 'sixa' ) }</p>
					</li>
				)
				}
				{ ! searchText.length && (
					<li>
						<Item
							id={ 'sixa-multi-select-all' }
							name={ 'sixa-multi-select-all'}
							label={ __( 'Select all', 'sixa' ) }
							isSelected={ areAllItemsSelected }
							onChange={ handleChangeSelectAll }
						/>
					</li>
				)}
				{ filteredOptions().map( ({ id, name, label }) => (
					<li key={id}>
						<Item
							id={ id }
							name={ name }
							label={ label }
							isSelected={ isItemSelected( id ) }
							onChange={ ( id ) => onChange( xor( selectedItems, [ id ] ) ) }
						/>
					</li>
				))}
			</ul>
		</ComponentWrapper>
	);
}

export default MultiSelect;
