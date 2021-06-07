/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { map } from 'lodash';

/**
 * The styled components generated using @emotion/react API.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import { HorizontalList } from './style';

/**
 * The styled Tag component generated using @emotion/react API.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import { StyledTag } from '../tag/style';

/**
 * Horizontal list of Tags.
 * This component is used in MultiSelect to render the selected options as a list of Tags. Tag items are
 * provided as { label, value } pairs and can be deselected by clicking the remove button.
 *
 * @function
 * @since	1.0.0
 * @param  	{Object}		props			The props that were defined by the caller of this component.
 * @param 	{Array}			props.items		List of items that should be displayed as Tags.
 * @param 	{Function}		props.onRemove	Callback function to trigger when the remove button in a tag is clicked.
 * @return {JSX.Element}					Horizontal list of Tags.
 * @example
 *
 * <SelectedTagList
 * 		items={ selectedOptions}
 * 		onRemove={ handleOnClickSelectedOptionTag }
 */
const SelectedTagList = ( { items, onRemove } ) => (
	<HorizontalList>
		{ map( items, ( { label, value }, index ) => (
			<StyledTag key={ value } label={ label } onRemove={ () => onRemove( index ) } />
		) ) }
	</HorizontalList>
);

export default SelectedTagList;
