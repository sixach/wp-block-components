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
import { selectOptions } from '@sixach/wp-block-utils';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @ignore
 * @see 	https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { BaseControl } from '@wordpress/components';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { useRef } from '@wordpress/element';

/**
 * Text to display for selecting all options.
 *
 * @ignore
 */
import selectAllOption from './select-all';

/**
 * Multi-select element for both taxonomy groups and individual posts selections.
 *
 * @function
 * @since 	 	1.0.0
 * @param       {Object}      props                          The props that were defined by the caller of this component.
 * @param       {string}      props.id                       A custom id set for the MultiSelect instance.
 * @param       {Array}       props.posts                    Array of posts passed to 'selectOptions' to generate the list of selected posts.
 * @param       {string}      props.label                    A custom label for the 'BaseControl' component.
 * @param       {boolean}     props.hideLabelFromVision      Whether to accessibly hide the label.
 * @param       {boolean}     props.help                     Optional help text for the control.
 * @param       {string}      props.className                The class that will be added with “components-background-size” to the classes of the wrapper div.
 * @param       {boolean}     props.isTerm                   Whether or not it is a taxonomy item.
 * @param       {boolean}     props.value                    Whether or not it is a taxonomy item.
 * @param       {boolean}     props.onChange                 Whether or not it is a taxonomy item.
 * @return      {JSX.Element}                                Post multi-select element.
 * @example
 *
 * <MultiSelect
 * 		attribute="posts"
 * 		posts={ allPosts }
 * 		id={ `my-component-multi-select` }
 * 		label={ __( 'MyPosts:', 'sixa' ) }
 * 		setAttributes={ setAttributes }
 * 		value={ posts }
 * />
 */
function MultiSelect( { id, label, hideLabelFromVision, help, posts, isTerm, className, value, onChange } ) {
	const optionsList = selectOptions( posts, { id: 'value', [ isTerm ? 'name' : 'title.rendered' ]: 'label' } );

	const valueRef = useRef( value );
	valueRef.current = value;

	const isSelectAllSelected = () => valueRef.current.length === optionsList.length;

	const isOptionSelected = () => valueRef.current.some( () => value === optionsList.value ) || isSelectAllSelected();

	const getOptions = () => [ selectAllOption, ...optionsList ];

	const getValue = () => ( isSelectAllSelected() ? [ selectAllOption ] : value );

	const handleOnChange = ( newValue, actionMeta ) => {
		const { action, option, removedValue } = actionMeta;

		if ( action === 'select-option' && option.value === selectAllOption.value ) {
			onChange( optionsList, actionMeta );
		} else if (
			( action === 'deselect-option' && option.value === selectAllOption.value ) ||
			( action === 'remove-value' && removedValue.value === selectAllOption.value )
		) {
			onChange( [], actionMeta );
		} else if ( actionMeta.action === 'deselect-option' && isSelectAllSelected() ) {
			onChange(
				optionsList.filter( () => value !== option.value ),
				actionMeta
			);
		} else {
			onChange( newValue || [], actionMeta );
		}
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
				isOptionSelected={ isOptionSelected }
				options={ getOptions() }
				value={ getValue() }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}

export default MultiSelect;
