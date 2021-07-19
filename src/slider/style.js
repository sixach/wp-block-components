/**
 * The styled API for @emotion/react.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

/**
 * Track component.
 *
 * @constant
 * @since	    1.3.0
 * @type		{JSX.Element}
 */
export const Track = styled.div`
	gap: ${ ( { gap } ) => `0 ${ gap }px` };
`;
