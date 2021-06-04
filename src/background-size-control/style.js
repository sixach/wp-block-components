/**
 * The styled API for @emotion/react.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @ignore
 * @see 	https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Flex } from '@wordpress/components';

/**
 * Wrapper around the component.
 *
 * @constant
 * @since 	   1.0.0
 * @type       {JSX.Element}
 * @ignore
 */
export const ComponentWrapper = styled( Flex )`
	padding-top: 12px;
`;

/**
 * Wrapper around the control.
 *
 * @constant
 * @since 	   1.0.0
 * @type       {JSX.Element}
 * @ignore
 */
export const ControlWrapper = styled( Flex )`
	padding-top: 22px;
`;
