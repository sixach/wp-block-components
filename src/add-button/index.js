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
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Button } from '@wordpress/components';

/**
 * Import icons from the WordPress icon library.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/
 */
import { plus } from '@wordpress/icons';

/**
 * A wrapper around the WordPress Button component
 * to allow adding item to the existing list of items.
 *
 * @function
 * @since	   1.5.0
 * @param 	   {Object}  	           props              Component properties.
 * @param 	   {string}  	   		   props.className    The CSS class name(s) that will be added to the component element.
 * @param 	   {string|JSX.Element}    props.children     HTML tag name (in string) or a React component.
 * @param 	   {Function}  	           props.onClick      Event handler for processing click events on the button component.
 * @return     {JSX.Element}                              Button element to render.
 * @example
 *
 * <AddButton
 *	   onClick={ handleOnClickAddButton }
 * />
 */
function AddButton( { className, children, onClick } ) {
	return (
		<Button className={ className } icon={ plus } isSecondary label={ __( 'Add', 'sixa' ) } onClick={ onClick }>
			{ children }
		</Button>
	);
}

AddButton.propTypes = {
	/**
	 * The CSS class name that will be appended to the wrapper div.
	 */
	className: PropTypes.string,
	/**
	 * React elements that are being passed as children.
	 */
	children: PropTypes.oneOfType( [ PropTypes.string, PropTypes.element ] ),
	/**
	 * Callback function executed when a click on the button happens.
	 */
	onClick: PropTypes.func,
};

AddButton.defaultProps = {
	className: undefined,
	children: undefined,
	onClick: () => {},
};

export default AddButton;
