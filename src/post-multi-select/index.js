/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { get, map } from 'lodash';

/**
 * Multiple selection dropdown component with `checkboxes`, `search` and `select-all`.
 */
import MultiSelect from 'react-multi-select-component';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { selectOptions, multiSelectItems } from '@sixach/wp-block-utils';

/**
 * WordPress dependencies
 */
import { BaseControl } from '@wordpress/components';

/**
 * Post multi-select element for both taxonomy groups and individual posts selections.
 *
 * @function
 * @since 	 	1.0.0
 * @param  	 	{Object}     props                    The props that were defined by the caller of this component.
 * @param    	{string}     props.attribute          The attribute type.
 * @param    	{string}     props.id                 A custom id set for the PostMultiSelect instance.
 * @param    	{Array}      props.entities           Array of entities passed to 'selectOptions' to generate the list of selected posts.
 * @param    	{string}     props.label              A custom label for the 'BaseControl' component.
 * @param    	{Array}      props.setAttributes      Set the attributes of the component such as the 'id' or 'reset'.
 * @param    	{string}     props.reset              Used to reset the values of another 'PostMultiSelect' component.
 * @param    	{Array}      props.selected           The user-selected posts from the dropdown.
 * @param    	{boolean}    props.isTerm             Whether or not it is a taxonomy item.
 * @return 	 	{JSX.Element}                         Post multi-select element.
 * @example
 *
 * <PostMultiSelect
 * 		attribute="posts"
 * 		entities={ allPosts }
 * 		id={ `my-component-multi-select` }
 * 		label={ __( 'MyPosts:', 'sixa' ) }
 * 		setAttributes={ setAttributes }
 * 		selected={ posts }
 *	/>
 */
function PostMultiSelect( { attribute, id, entities, label, setAttributes, reset, selected, isTerm } ) {
	const postList = selectOptions( entities, { id: 'value', [ isTerm ? 'name' : 'title.rendered' ]: 'label' } );
	const onChange = ( values ) => {
		const ids = map( values, ( item ) => get( item, 'value' ) );
		setAttributes( { [ attribute ]: ids } );

		// If passed, reset the existing value with an empty array.
		if ( !! reset ) {
			setAttributes( { [ reset ]: [] } );
		}
	};

	return (
		<BaseControl id={ id } label={ label }>
			<MultiSelect
				className={ `sixa-multi-select` }
				hasSelectAll={ true }
				focusSearchOnOpen={ false }
				options={ postList }
				onChange={ ( value ) => onChange( value ) }
				value={ multiSelectItems( postList, selected ) }
			/>
		</BaseControl>
	);
}

export default PostMultiSelect;
