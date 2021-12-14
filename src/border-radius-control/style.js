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
import { BaseControl, Flex } from '@wordpress/components';

/**
 * Wrapper around the component.
 *
 * @constant
 * @since 	    1.14.0
 * @type        {JSX.Element}
 * @ignore
 */
export const ComponentWrapper = styled( BaseControl )`
	box-sizing: border-box;
	margin-bottom: 0 !important;
	max-width: 235px;
	padding-bottom: 12px;
	width: 100%;

	> div {
		margin-bottom: 0 !important;
	}
`;

/**
 * Header element.
 *
 * @constant
 * @since 	    1.14.0
 * @type        {JSX.Element}
 * @ignore
 */
export const Header = styled( Flex )`
	padding-bottom: 8px;
`;

/**
 * Wrapper around the header components.
 *
 * @constant
 * @since 	    1.14.0
 * @type        {JSX.Element}
 * @ignore
 */
export const HeaderControlWrapper = styled( Flex )`
	gap: 0;
	justify-content: flex-end;
	min-height: 30px;
`;

/**
 * Input components.
 *
 * @constant
 * @since 	    1.14.0
 * @type        {JSX.Element}
 * @ignore
 */
export const Input = styled( Flex )`
	height: 100%;
	justify-content: flex-start;
	position: relative;
	width: 100%;
`;

/**
 * Wrapper around the input components.
 *
 * @constant
 * @since 	    1.14.0
 * @type        {JSX.Element}
 * @ignore
 */
export const InputsWrapper = styled( Flex )`
	padding-top: 8px;

	> div {
		margin-left: -1px;
	}
	> div:nth-of-type( n + 2 ) > div {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	> div:nth-last-of-type( n + 2 ) > div {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
`;

/**
 * Wrapper around the `UnitControl` component.
 *
 * @constant
 * @since 	    1.14.0
 * @type        {JSX.Element}
 * @ignore
 */
export const UnitControlWrapper = styled.div`
	box-sizing: border-box;
	max-width: 60px;
`;
