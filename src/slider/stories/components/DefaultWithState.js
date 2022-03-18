/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { add, map, join, range } from 'lodash';
import { randomHexColorWithArray } from 'random-hex-color-generator';

/**
 * WordPress dependencies
 */
import { Flex } from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Slider from '../../';

function DefaultWithState( { length, margin, ...wrapperProps } ) {
	const sliderRef = useRef();
	const [ items, setItems ] = useState( () => range( 0, length ) );

	useEffect( () => {
		setItems( range( 0, length ) );
	}, [ length ] );

	return (
		<Slider ref={ sliderRef } { ...wrapperProps }>
			{ map( items, ( item ) => {
				const textContent = add( item, 1 );
				return (
					<Slide align="center" margin={ margin } colors={ randomHexColorWithArray( 3 ) } key={ textContent } justify="center">
						{ textContent }
					</Slide>
				);
			} ) }
		</Slider>
	);
}

const Slide = styled( Flex )`
	width: 66%;
	margin-right: ${ ( { margin } ) => `${ margin }px` };
	background-color: #efefef;
	border-image: ${ ( { colors } ) => `linear-gradient(to right, ${ join( colors, ',' ) } ) 5` };
	border-style: solid;
	border-width: 3px;
	color: #555d66;
	min-height: 300px;
	font-size: 40px;
	font-weight: 700;
`;

export default DefaultWithState;
