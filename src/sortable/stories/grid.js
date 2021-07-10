/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { map, range, get, add } from 'lodash';
import { useState, useEffect } from '@wordpress/element';
import { Flex } from '@wordpress/components';
import { randomHexColor } from 'random-hex-color-generator';
import isDarkColor from 'is-dark-color';

/**
 * Internal dependencies
 */
import Sortable from '../';

function GridWithState( { length } ) {
	const [ items, setItems ] = useState( [] );
	const handleOnSortEnd = ( value ) => {
		setItems( map( value, ( { key, props } ) => ( { item: key, backgroundColor: get( props, 'style.backgroundColor' ) } ) ) );
	};

	useEffect( () => {
		setItems( map( range( 0, length ), ( item ) => ( { item: add( item, 1 ), backgroundColor: randomHexColor() } ) ) );
	}, [ length ] );

	return (
		<GridWrapper onChange={ handleOnSortEnd }>
			{ map( items, ( { item, backgroundColor } ) => (
				<GridItem align="center" justify="center" key={ item } style={ { backgroundColor } } isDark={ isDarkColor( backgroundColor ) }>
					{ item }
				</GridItem>
			) ) }
		</GridWrapper>
	);
}

const GridWrapper = styled( Sortable )`
	display: grid;
	grid-gap: 16px;
	grid-template-columns: repeat( 3, auto );
`;
const GridItem = styled( Flex )`
	cursor: grab;
	font-size: 20px;
	height: 150px;
	color: ${ ( props ) => ( props?.isDark ? '#FFFFFF' : '#000000' ) };
`;

export default GridWithState;
