/**
 * The styled API for @emotion/react.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import styled from "@emotion/styled";

/**
 * The unstyled Tag component.
 *
 * @ignore
 */
import Tag from "./index";

/**
 * Styled Tag component.
 *
 * @constant
 * @since		1.0.0
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
    padding-left: 12px;
    border-radius: 12px 0 0 12px;
    color: #555d66;

    > button {
    	margin-left: 4px;
    }
`;
