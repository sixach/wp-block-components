import styled from "@emotion/styled";


import Tag from "./index";

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
