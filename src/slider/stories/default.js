/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { add, map, range, join } from 'lodash';
import { useRef, useState } from '@wordpress/element';
import { Flex } from '@wordpress/components';
import { randomHexColorWithArray } from 'random-hex-color-generator';

/**
 * Internal dependencies
 */
import Slider from '../';

function DefaultWithState( { length, ...wrapperProps } ) {
	const sliderRef = useRef();
	const [ items ] = useState( () => range( 0, length ) );

	return (
		<Slider ref={ sliderRef } { ...wrapperProps }>
			{ map( items, ( item ) => {
				const textContent = add( item, 1 );
				return (
					<Slide align="center" justify="center" key={ textContent } colors={ randomHexColorWithArray( 3 ) }>
						{ textContent }
					</Slide>
				);
			} ) }
		</Slider>
	);
}

const Slide = styled( Flex )`
	font-size: 40px;
	font-weight: 700;
	min-height: 300px;
	border-width: 3px;
	border-style: solid;
	background-color: #efefef;
	color: #555d66;
	border-image: ${ ( { colors } ) => `linear-gradient(to right, ${ join( colors, ',' ) } ) 5` };
`;

export default DefaultWithState;
