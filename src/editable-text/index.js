/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * This module allows you to create and use standalone block-editor element and components.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
 */
import { RichText } from '@wordpress/block-editor';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 */
import { ifCondition } from '@wordpress/compose';

/**
 * Helper constants.
 */
import Constants from './constants';

/**
 * A editable text component that provides a label for a media item.
 *
 * @function
 * @since	   1.5.0
 * @param 	   {Object}  	    props              Component properties.
 * @param 	   {string}  	    props.className    The CSS class name(s) that will be added to the component element.
 * @param 	   {boolean}  	    props.isSave       Whether the field is meant to be rendered on the front-end.
 * @param 	   {Function}  	    props.onChange 	   Function that receives the value of the input.
 * @param 	   {Function}  	    props.onFocus 	   Function that is called when the element receives focus.
 * @param 	   {string}  	    props.value        Title property as the content.
 * @return     {JSX.Element}                       Editable text component or static content element to render.
 * @example
 *
 * <EditableText
 *     className={ `${ className }__title` }
 *	   onChange={ ( value ) => setAttributes( { title: value } ) }
 *	   placeholder={ __( 'Title…', 'sixa' ) }
 *	   shouldRender={ elements?.title }
 *     tagName="h3"
 *	   value={ title }
 * />
 */
function EditableText( { className, isSave, onChange, onFocus, value, ...otherProps } ) {
	return isSave ? (
		RichText.isEmpty( value ) ? null : (
			<RichText.Content className={ className } value={ value } { ...otherProps } />
		)
	) : (
		<RichText
			allowedFormats={ Constants.ALLOWED_FORMATS }
			className={ className }
			multiline={ false }
			onChange={ onChange }
			unstableOnFocus={ onFocus }
			placeholder={ __( 'Enter text…', 'sixa' ) }
			preserveWhiteSpace
			value={ value }
			withoutInteractiveFormatting
			__unstableOnSplitAtEnd={ [] }
			{ ...otherProps }
		/>
	);
}

EditableText.propTypes = {
	/**
	 * The CSS class name that will be appended to the wrapper div.
	 */
	className: PropTypes.string,
	/**
	 * Whether the field is meant to be rendered on the front-end.
	 */
	isSave: PropTypes.bool,
	/**
	 * Callback function to be triggered when the value of the input change.
	 */
	onChange: PropTypes.func,
	/**
	 * Function that is called when the element receives focus.
	 */
	onFocus: PropTypes.func,
	/**
	 * Value of the control.
	 */
	value: PropTypes.string,
};

EditableText.defaultProps = {
	className: undefined,
	isSave: false,
	onChange: () => {},
	onFocus: () => {},
	shouldRender: true,
	value: undefined,
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( EditableText );
