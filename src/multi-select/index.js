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
 * The styled components.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import { Option, Menu } from './select-components';

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
 * @param       {string}      props.className                The class that will be added with “components-multi-select” to the classes of the wrapper div.
 * @param       {boolean}     props.isTerm                   Whether or not it is a taxonomy item.
 * @param       {boolean}     props.closeMenuOnSelect        Close the select menu when the user selects an option.
 * @param       {boolean}     props.hideSelectedOptions      Hide the selected option from the menu.
 * @param       {Object}      props.selected                 Currently selected option.
 * @param       {Function}    props.onChange                 Handle changes.
 * @param       {number}      props.selectionLimit           Set a limit on number of items that can be selected.
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
function MultiSelect( {
	id,
	label,
	hideLabelFromVision,
	help,
	posts,
	isTerm,
	className,
	selected,
	onChange,
	selectionLimit,
	closeMenuOnSelect,
	hideSelectedOptions,
} ) {
	const optionsList = selectOptions( posts, { id: 'value', [ isTerm ? 'name' : 'title.rendered' ]: 'label' } );

	// Select All options
	const valueRef = useRef( selected );
	valueRef.current = selected;

	const isSelectAllSelected = () => valueRef.current.length === optionsList.length;

	const isOptionSelected = ( option ) => valueRef.current.some( ( { value } ) => value === option.value ) || isSelectAllSelected();

	const getOptions = () => [ selectAllOption, ...optionsList ];

	const getValue = () => ( isSelectAllSelected() ? [ selectAllOption ] : selected );

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
				optionsList.filter( ( { value } ) => value !== option.value ),
				actionMeta
			);
		} else {
			onChange( newValue || [], actionMeta );
		}
	};

	// Prevent keyboard option input
	const isValidNewOption = ( inputValue, selectValue ) => inputValue.length > 0 && selectValue.length < selectionLimit;

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
				components={ { Option, Menu } }
				selectProps={ { selectionLimit } }
				className={ `sixa-multi-select` }
				classNamePrefix="sixa-select"
				closeMenuOnSelect={ closeMenuOnSelect }
				hideSelectedOptions={ hideSelectedOptions }
				isValidNewOption={ isValidNewOption }
				isOptionSelected={ isOptionSelected }
				options={ selected.length === selectionLimit ? [] : getOptions() }
				value={ getValue() }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}

export default MultiSelect;
