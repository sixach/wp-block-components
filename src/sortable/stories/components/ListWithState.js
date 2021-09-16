/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { map, range, get, add } from 'lodash';
import { randomHexColor } from 'random-hex-color-generator';
import isDarkColor from 'is-dark-color';

/**
 * WordPress dependencies
 */
import { Flex } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Sortable from '../../';

function ListWithState( { length, withKnobs } ) {
	const [ items, setItems ] = useState( [] );
	const handleOnSortEnd = ( value ) => {
		setItems( map( value, ( { key, props } ) => ( { item: key, backgroundColor: get( props, 'style.backgroundColor' ) } ) ) );
	};

	useEffect( () => {
		setItems( map( range( 0, length ), ( item ) => ( { item: add( item, 1 ), backgroundColor: randomHexColor() } ) ) );
	}, [ length ] );

	return (
		<ListWrapper onChange={ handleOnSortEnd } withSortableKnob={ withKnobs }>
			{ map( items, ( { item, backgroundColor } ) => (
				<ListItem
					align="center"
					justify="center"
					isDark={ isDarkColor( backgroundColor ) }
					key={ item }
					style={ { backgroundColor } }
					withKnobs={ withKnobs }
				>
					{ item }
				</ListItem>
			) ) }
		</ListWrapper>
	);
}

const ListWrapper = styled( Sortable )`
	display: grid;
	grid-row-gap: 16px;
	grid-template-columns: 150px;
	grid-template-rows: auto;
`;
const ListItem = styled( Flex )`
	font-size: 20px;
	height: 50px;
	cursor: ${ ( props ) => ( props?.withKnobs ? 'auto' : 'grab' ) };
	color: ${ ( props ) => ( props?.isDark ? '#FFFFFF' : '#000000' ) };
`;

export default ListWithState;
