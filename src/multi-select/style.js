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
import { FlexBlock } from '@wordpress/components';

/**
 * Wrapper around the component.
 *
 * @constant
 * @since		1.0.0
 * @type		{JSX.Element}
 * @ignore
 */
export const ComponentWrapper = styled( FlexBlock )`
	padding-top: 12px;

	& > ul {
		margin: 0;
		padding: 4px !important;
		max-height: 300px;
		overflow-y: scroll;
	}
	& > ul > li {
		list-style-type: none;
	}
`;

/**
 * Wrapper around `SelectedTagList`.
 * Makes native `ul` element horizontal.
 *
 * @constant
 * @since		1.0.0
 * @type		{JSX.Element}
 * @ignore
 */
export const SelectedTagListWrapper = styled.ul`
	display: flex;
	flex-wrap: wrap;
`;
