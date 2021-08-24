/**
 * The styled API for @emotion/react.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

export const Accordion = styled.details`
	border: ${ props => props.active ? `${props.borderThickness}px solid ${props.borderColor}` : 'none'};
	background-color: ${ ( props ) => props.backgroundColor };
	color: ${ ( props ) => props.fontColor };
	padding: 12px;
`;