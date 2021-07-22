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
import { Button, FlexBlock } from '@wordpress/components';

/**
 * Sortable component.
 */
import Sortable from '../sortable';

/**
 * Wrapper around the component.
 *
 * @constant
 * @since	  1.3.0
 * 			  Moved nested styles to their own components.
 * @since	  1.1.0
 * @type	  {JSX.Element}
 */
export const ComponentWrapper = styled( FlexBlock )`
	padding-top: 12px;
`;

/**
 * Clear button component.
 *
 * @constant
 * @since	  1.3.0
 * @type	  {JSX.Element}
 */
export const ClearButton = styled( Button )`
	margin-left: 12px;
`;

/**
 * Options list wrapper.
 *
 * @constant
 * @since	  1.3.0
 * @type	  {JSX.Element}
 */
export const OptionsWrapper = styled.ul`
	margin: 0;
	padding: 4px;
	max-height: 300px;
	overflow-y: scroll;

	li {
		list-style-type: none;
	}
`;

/**
 * In place of the `Sortable` component.
 *
 * @constant
 * @since		1.3.0
 * 				Added `flex` styling.
 * @since		1.2.0
 * @type		{JSX.Element}
 * @ignore
 */
export const SelectedTagListWrapper = styled( Sortable )`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: flex-start;
	max-height: 300px;
	overflow-y: scroll;
	margin-bottom: 17px;

	.sixa-component-tag {
		cursor: grab;
		margin-bottom: calc( 4px * 2 );
	}
`;
