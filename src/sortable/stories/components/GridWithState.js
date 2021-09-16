/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { add, map, range } from 'lodash';
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

function GridWithState( { length } ) {
	const [ items, setItems ] = useState( [] );
	const handleOnSortEnd = ( value ) => {
		setItems( map( value, ( { key, props } ) => ( { backgroundColor: props?.style?.backgroundColor, item: key } ) ) );
	};

	useEffect( () => {
		setItems( map( range( 0, length ), ( item ) => ( { backgroundColor: randomHexColor(), item: add( item, 1 ) } ) ) );
	}, [ length ] );

	return (
		<GridWrapper onChange={ handleOnSortEnd }>
			{ map( items, ( { backgroundColor, item } ) => (
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
	color: ${ ( props ) => ( props?.isDark ? '#FFFFFF' : '#000000' ) };
	cursor: grab;
	font-size: 20px;
	height: 150px;
`;

export default GridWithState;
