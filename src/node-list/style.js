/**
 * The styled API for @emotion/react.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

/**
 * Wrapper around the inner child components.
 *
 * @constant
 * @since	    1.5.0
 * @type		{JSX.Element}
 */
export const List = styled.li`
	border: 1px dashed #767676;
	padding: 16px;

	> div {
		margin-bottom: 0;

		p {
			margin-bottom: 0;
		}
	}
`;
