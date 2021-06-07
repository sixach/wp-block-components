
import { map } from 'lodash';

import { HorizontalList } from "../multi-select/style";
import { StyledTag } from "./style";

const TagList = ({ tags, onRemove }) => {
	return (
		<HorizontalList>
			{ map( tags, ({ label, value }, index) => <StyledTag key={ value } label={ label } onRemove={() => onRemove(index)} /> ) }
		</HorizontalList>
	);
};

export default TagList;
