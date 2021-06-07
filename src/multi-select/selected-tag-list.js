import { map } from 'lodash';

import { HorizontalList } from "./style";
import { StyledTag } from "../tag/style";

const SelectedTagList = ({ items, onRemove }) => (
	<HorizontalList>
		{ map( items, ({ label, value }, index ) => <StyledTag key={ value } label={ label } onRemove={() => onRemove(index)} /> ) }
	</HorizontalList>
);

export default SelectedTagList;
