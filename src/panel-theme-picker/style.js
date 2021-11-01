/**
 * The styled API for @emotion/react.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Button, Flex, FlexItem } from '@wordpress/components';

/**
 * Wrapper around the inner child components.
 *
 * @constant
 * @since	    1.10.1
 * @type		{JSX.Element}
 */
export const Wrapper = styled( Flex )`
	gap: 10px;
	height: 100%;
	margin-bottom: 10px;
	width: 100%;
`;

/**
 * Skin item wrapper.
 *
 * @constant
 * @since	    1.10.1
 * @type		{JSX.Element}
 */
export const Item = styled( FlexItem )`
	margin: 0 !important;
	width: calc( 50% - 5px );
`;

/**
 * Theme element.
 *
 * @constant
 * @since	    1.10.1
 * @type		{JSX.Element}
 */
export const Theme = styled( Button )`
	align-items: center;
	display: flex;
	justify-content: center;
	height: 80px;
	opacity: ${ ( { isSelected } ) => ( isSelected ? 1 : 0.6 ) };
	padding: 14px 0;
	position: relative;
	width: 100%;

	span {
		padding: 0;
	}

	&:before {
		background-image: ${ ( { imageUri } ) => `url(${ imageUri })` };
		background-position: center;
		background-repeat: no-repeat;
		background-size: 150% 140%;
		content: '';
		height: ${ ( { isSelected } ) => `calc(100% - ${ isSelected ? '6px' : '2px' })` };
		position: absolute;
		width: ${ ( { isSelected } ) => `calc(100% - ${ isSelected ? '6px' : '2px' })` };
	}

	&:hover {
		opacity: 1;
	}

	&:focus {
		box-shadow: none;
	}
`;
