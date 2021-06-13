/**
 * The styled API for @emotion/react.
 *
 * @see 	https://www.npmjs.com/package/@emotion/styled
 * @ignore
 */
import styled from '@emotion/styled';

/**
 * The Tag component.
 *
 * @ignore
 */
import Tag from './index';

/**
 * Styled Tag component.
 *
 * @constant
 * @since		1.1.0
 * @type		{JSX.Element}
 * @ignore
 */
export const StyledTag = styled( Tag )`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-right: 12px;
	background-color: #efefef;
	padding: 0 12px;
	border-radius: 12px;
	color: #555d66;

	.sixa-component-tag__remove-button {
		margin-left: 4px;
		margin-right: -12px !important;
	}
`;
