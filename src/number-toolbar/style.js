/* eslint-disable @wordpress/no-unsafe-wp-apis */

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
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';

/**
 * Styled NumberControl component.
 *
 * @constant
 * @since	    1.9.0
 * @type		{JSX.Element}
 */
export const NumericControl = styled( NumberControl )`
	max-width: 100px;
`;
