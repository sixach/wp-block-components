/**
 * Utility for libraries from the `Lodash`.
 */
import { map } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { useCallback } from '@wordpress/element';

/**
 * The styled Tag component generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import Tag from '../tag';

/**
 * The styled component wrapper generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import { SelectedTagListWrapper } from './style';

/**
 * Horizontal list of Tags.
 * This component is used in MultiSelect to render the selected options as a list of Tags. Tag items are
 * provided as { label, value } pairs and can be deselected by clicking the remove button.
 *
 * @function
 * @since	   1.3.0
 * 			   Added default props.
 *  		   Indented 4 spacing.
 * @since	   1.2.0
 * @param	   {Object}			props			  The props that were defined by the caller of this component.
 * @param	   {Array}			props.items		  List of items that should be displayed as Tags.
 * @param	   {Function}		props.onChange	  Callback function to be triggered when the user finishes a sorting gesture.
 * @param	   {Function}		props.onRemove    Callback function to trigger when the remove button in a tag is clicked.
 * @return	   {JSX.Element}    				  Horizontal list of Tags.
 * @example
 *
 * <SelectedTagList
 * 		items={ selectedOptions }
 * 		onChange={ onChange }
 * 		onRemove={ handleOnClickSelectedOptionTag }
 * 	/>
 */
function SelectedTagList( { items, onChange, onRemove } ) {
	const handleOnChange = useCallback( ( newItems ) => {
		onChange( map( newItems, ( { props: { value } } ) => value ) );
	}, [] );

	return (
		<SelectedTagListWrapper className="sixa-component-multiselect__tag-list" onChange={ handleOnChange }>
			{ map( items, ( { value, label }, index ) => (
				<Tag key={ value } label={ label } onRemove={ () => onRemove( index ) } value={ value } />
			) ) }
		</SelectedTagListWrapper>
	);
}

SelectedTagList.propTypes = {
	/**
	 * List of items that will be displayed as Tag(s).
	 */
	items: PropTypes.array.isRequired,
	/**
	 * Callback function to be triggered when user finishes a sorting gesture.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * Callback function to trigger when the remove button from the Tag component is clicked.
	 */
	onRemove: PropTypes.func.isRequired,
};

SelectedTagList.defaultProps = {
	items: [],
	onChange: undefined,
	onRemove: undefined,
};

export default SelectedTagList;
