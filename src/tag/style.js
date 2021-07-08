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
import { Flex, FlexItem } from '@wordpress/components';

/**
 * Styled Tag component.
 *
 * @constant
 * @since	    1.3.0
 * 				Updated the base component to `Flex`
 * @since	    1.1.0
 * @type		{JSX.Element}
 */
export const StyledTag = styled( Flex )`
	padding: 0 12px;
	margin-right: 12px;
	background-color: #efefef;
	border-radius: 12px;
	color: #555d66;
`;

/**
 * Wrapper around the inner child components.
 *
 * @constant
 * @since	    1.3.0
 * @type		{JSX.Element}
 */
export const Child = styled( FlexItem )`
	margin-top: 4px;
	margin-bottom: 4px !important;
`;
