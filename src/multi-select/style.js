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
 * @since 	 	1.0.0
 * @type        {JSX.Element}
 * @ignore
 */
export const SelectionLimit = styled( Flex )`
	margin: 15px;
`;
