/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { map } from 'lodash';

/**
 * The styled Tag component generated using @emotion/react API.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import { StyledTag } from '../tag/style';

/**
 * The styled component wrapper generated using @emotion/react API.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import { SelectedTagListWrapper } from "./style";

/**
 * Horizontal list of Tags.
 * This component is used in MultiSelect to render the selected options as a list of Tags. Tag items are
 * provided as { label, value } pairs and can be deselected by clicking the remove button.
 *
 * @function
 * @since	1.0.0
 * @param	{Object}		props			The props that were defined by the caller of this component.
 * @param	{Array}			props.items		List of items that should be displayed as Tags.
 * @param	{Function}		props.onRemove	Callback function to trigger when the remove button in a tag is clicked.
 * @return	{JSX.Element}					Horizontal list of Tags.
 * @example
 *
 * <SelectedTagList
 * 		items={ selectedOptions}
 * 		onRemove={ handleOnClickSelectedOptionTag }
 * 	/>
 */
const SelectedTagList = ( { items, onRemove } ) => (
	<SelectedTagListWrapper className="sixa-component-multiselect__tag-list">
		{ map( items, ( { label }, index ) => (
			<StyledTag key={ index } label={ label } onRemove={ () => onRemove( index ) } />
		) ) }
	</SelectedTagListWrapper>
);

export default SelectedTagList;
