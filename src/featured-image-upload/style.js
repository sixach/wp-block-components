/**
 * The styled API for @emotion/react.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

/**
 * Spinners notify users that their action is being processed.
 */
import Loading from '../loading';

/**
 * Loading (indicator) component.
 *
 * @constant
 * @since	    1.11.1
 * @type		{JSX.Element}
 */
export const Spinner = styled( Loading )`
	.components-spinner {
		left: 0;
		margin: 0 4px 8px;
		position: relative;
	}
`;
