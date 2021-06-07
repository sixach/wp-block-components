/**
 * The styled API for @emotion/react.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

import { indexOf, get, escapeRegExp, invoke, filter, map, some, find } from 'lodash';

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

import { removeAtIndex } from "@sixach/wp-block-utils/src";

import Item from './item';
import Tag from '../tag';
import { ListTag } from "../tag/style";
import { ComponentWrapper, HorizontalList,  } from "./style";


function MultiSelect({ items, selectedItems, groups, selectedGroups, onChange, className }) {
	const [ searchText, setSearchText ] = useState( '' );
	const [ selected, setSelected ] = useState( [] );

	// initially set selected items in state to selected items from props.
	useEffect( () => {
		setSelected( map( selectedItems, ( value ) => find( items, [ 'value', value ] ) ) );
	}, [] );

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
		updateSelected( removeAtIndex( selected, index ) );
	}

	const handleOnChangeSelectAll = () => {
		let newSelected = [];
		if ( ! areAllItemsSelected ) {
			newSelected = items;
		}
		updateSelected( newSelected );
	}

	const handleOnChangeOption = ( item ) => {
		let newSelected = [ ...selected, item ];
		if ( isItemSelected( get( item, 'value' ) ) ) {
			newSelected = filter( selected, ({ value }) => value !== get( item, 'value' ) );
		}
		updateSelected( newSelected );
	}

	const updateSelected = ( newSelected ) => {
		setSelected( newSelected, () => onChange( newSelected ) );
	}

	return (
		<ComponentWrapper>
			{ !! selected.length && (
				<HorizontalList>
					{ map( selected, ({ value, label }, index) => (
						<Tag key={value} label={label} onRemove={() => handleOnClickTagButton( index )} />
					))}
				</HorizontalList>
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
