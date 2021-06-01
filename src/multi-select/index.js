/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { get, map } from 'lodash';

/**
 * Utility for conditionally joining CSS class names together.
 *
 * @ignore
 */
import classnames from 'classnames';

/**
 * Multiple selection dropdown component with with multiselect, autocomplete, async and creatable support.
 *
 * @ignore
 */
import Select from 'react-select';

/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 */
import { selectOptions, multiSelectItems } from '@sixach/wp-block-utils';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @ignore
 * @see 	https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { BaseControl } from '@wordpress/components';

/**
 * Multi-select element for both taxonomy groups and individual posts selections.
 *
 * @function
 * @since 	 	1.0.0
 * @param       {Object}      props                          The props that were defined by the caller of this component.
 * @param       {string}      props.attribute                The attribute type.
 * @param       {string}      props.id                       A custom id set for the MultiSelect instance.
 * @param       {Array}       props.entities                 Array of entities passed to 'selectOptions' to generate the list of selected posts.
 * @param       {string}      props.label                    A custom label for the 'BaseControl' component.
 * @param       {boolean}     props.hideLabelFromVision      Whether to accessibly hide the label.
 * @param       {boolean}     props.help                     Optional help text for the control.
 * @param       {string}      props.className                The class that will be added with “components-background-size” to the classes of the wrapper div.
 * @param       {Array}       props.selected                 The user-selected posts from the dropdown.
 * @param       {boolean}     props.isTerm                   Whether or not it is a taxonomy item.
 * @param    	{Array}       props.setAttributes      Set the attributes of the component such as the 'id' or 'reset'.
 * @return      {JSX.Element}                                Post multi-select element.
 * @example
 *
 * <MultiSelect
 * 		attribute="posts"
 * 		entities={ allPosts }
 * 		id={ `my-component-multi-select` }
 * 		label={ __( 'MyPosts:', 'sixa' ) }
 * 		setAttributes={ setAttributes }
 * 		value={ posts }
 * />
 */
function MultiSelect( { id, label, hideLabelFromVision, help, attribute, entities, selected, isTerm, className, setAttributes } ) {
	const postList = selectOptions( entities, { id: 'value', [ isTerm ? 'name' : 'title.rendered' ]: 'label' } );
	const handleOnChange = ( values ) => {
		const ids = map( values, ( item ) => get( item, 'value' ) );
		setAttributes( { [ attribute ]: ids } );
	};

	return (
		<BaseControl
			id={ id }
			label={ label }
			help={ help }
			hideLabelFromVision={ hideLabelFromVision }
			className={ classnames( 'components-multi-select', className ) }
		>
			<Select
				isMulti
				className={ `sixa-multi-select` }
				classNamePrefix="sixa-select"
				closeMenuOnSelect={ false }
				options={ postList }
				onChange={ ( value ) => handleOnChange( value ) }
				value={ multiSelectItems( postList, selected ) }
			/>
		</BaseControl>
	);
}

export default MultiSelect;
