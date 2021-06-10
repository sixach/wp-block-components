/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { map } from 'lodash';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @ignore
 * @see 	https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Flex, FlexItem } from '@wordpress/components';

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
	<Flex justify="flex-start" className="sixa-component-multiselect__tag-list">
		{ map( items, ( { label, value }, index ) => (
			<FlexItem key={ value }>
				<StyledTag label={ label } onRemove={ () => onRemove( index ) } />
			</FlexItem>
		) ) }
	</Flex>
);

export default SelectedTagList;
