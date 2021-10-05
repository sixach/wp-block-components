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
import { ComboboxControl, FlexBlock } from '@wordpress/components';

/**
 * A layout component that expands to fit the remaining space of Flex.
 *
 * @constant
 * @since	    1.6.0
 * @type		{JSX.Element}
 */
export const Wrapper = styled( FlexBlock )`
	height: 100%;

	> div:not( :empty ) {
		height: 100%;
	}
`;

/**
 * Select dropdown component.
 *
 * @constant
 * @since	    1.6.0
 * @type		{JSX.Element}
 */
export const Select = styled( ComboboxControl )`
	height: 100%;

	.components-base-control__field {
		height: 100%;
	}

	.components-combobox-control__suggestions-container {
		align-items: center;
		height: 100%;
		margin-bottom: 0;
	}

	.components-form-token-field__suggestions-list {
		margin: 0;
		padding: 0;
	}
`;
