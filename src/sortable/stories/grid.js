/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { map, range, get } from 'lodash';
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
		setItems( map( value, ( { key, props } ) => ( { name: key, backgroundColor: get( props, 'style.backgroundColor' ) } ) ) );
	};

	useEffect( () => {
		setItems( map( range( 1, length ), ( name ) => ( { name, backgroundColor: randomHexColor() } ) ) );
	}, [ length ] );

	return (
		<GridWrapper onChange={ handleOnSortEnd }>
			{ map( items, ( { name, backgroundColor } ) => (
				<GridItem align="center" justify="center" key={ name } style={ { backgroundColor } } isDark={ isDarkColor( backgroundColor ) }>
					{ name }
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
