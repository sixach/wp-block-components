/**
 * The styled API for @emotion/react.
 *
 * @see 	https://www.npmjs.com/package/@emotion/styled
 * @ignore
 */
import styled from '@emotion/styled';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see 	https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 * @ignore
 */
import { FlexBlock } from '@wordpress/components';

/**
 * Wrapper around the component.
 *
 * @constant
 * @since		1.1.0
 * @type		{JSX.Element}
 * @ignore
 */
export const ComponentWrapper = styled( FlexBlock )`
	padding-top: 12px;

	.sixa-component-multiselect__clear-all-button {
		margin-left: 12px;
	}

	.sixa-component-multiselect__option-list {
		margin: 0;
		padding: 4px !important;
		max-height: 300px;
		overflow-y: scroll;
	}

	.sixa-component-multiselect__option-list li {
		list-style-type: none;
	}

	.sixa-component-multiselect__tag-list {
		margin-bottom: 17px;
	}
`;

/**
 * Wrapper around `SelectedTagList`.
 *
 * @constant
 * @since		1.1.0
 * @type		{JSX.Element}
 * @ignore
 */
export const SelectedTagListWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: -4px;
	max-height: 300px;
	overflow-y: scroll;

	.sixa-component-tag {
		margin: 4px;
	}
`;
