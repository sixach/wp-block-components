/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * Helper React hooks specific for Sixa projects.
 */
import { useConditionalRef } from '@sixa/wp-react-hooks';

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
import { BlockControls, RichText } from '@wordpress/block-editor';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 */
import { ifCondition } from '@wordpress/compose';

/**
 * Import icons from the WordPress icon library.
 *
 * @see    https://github.com/WordPress/gutenberg/blob/trunk/packages/icons/README.md
 */
import { link as linkIcon } from '@wordpress/icons';

/**
 * Renders a link control.
 */
import LinkControl from '../link-control';

/**
 * Helper constants.
 */
import Constants from './constants';

/**
 * Button component.
 *
 * @function
 * @since	   1.5.1
 * @param 	   {Object}  	    props               		  Component properties.
 * @param 	   {string}  	    props.className     		  The CSS class name(s) that will be added to the component element.
 * @param 	   {boolean}  	    props.isLinkControlVisible    Whether the LinkControl is set to be visible.
 * @param 	   {boolean}  	    props.isSave        		  Whether the field is meant to be rendered on the front-end.
 * @param 	   {Function}  	    props.onChange 	   			  Function that receives the value of the input.
 * @param 	   {Function}  	    props.setLinkControlVisible   A toggle function. This allows for non boolean toggles.
 * @param 	   {string}  	    props.value         		  Label property as the content.
 * @return     {JSX.Element}                        		  Button element to render.
 * @example
 *
 * <Button
 *     className={ `${ className }__button` }
 *	   isLinkControlVisible={ isLinkControlVisible }
 *	   onChange={ ( value ) => setAttributes( { button: value } ) }
 * 	   setLinkControlVisible={ setLinkControlVisible }
 *	   shouldRender={ elements?.button }
 *	   value={ button }
 * />
 */
function Button( { className, isLinkControlVisible, isSave, onChange, setLinkControlVisible, value: button, ...otherProps } ) {
	const anchorRef = useConditionalRef( isSave );
	const richTextRef = useConditionalRef( isSave );
	const { link, text } = button;
	const handleOnChange = ( value ) => {
		onChange( { ...button, ...value } );
	};

	return isSave ? (
		RichText.isEmpty( text ) ? null : (
			<RichText.Content
				className={ classnames( className, Constants.BUTTON_CLASSNAME ) }
				href={ link?.url }
				rel={ link?.rel || 'noopener' }
				tagName="a"
				target={ Boolean( link?.opensInNewTab ) ? '_blank' : '_self' }
				value={ text }
				{ ...otherProps }
			/>
		)
	) : (
		<>
			<RichText
				allowedFormats={ [] }
				className={ classnames( className, Constants.BUTTON_CLASSNAME ) }
				multiline={ false }
				onChange={ ( value ) => handleOnChange( { text: value } ) }
				placeholder={ __( 'Add text…', 'sixa' ) }
				preserveWhiteSpace
				ref={ richTextRef }
				value={ text }
				withoutInteractiveFormatting
				__unstableOnSplitAtEnd={ [] }
				{ ...otherProps }
			/>
			<LinkControl
				anchorRef={ anchorRef }
				className="wp-block-navigation-link__inline-link-input"
				shouldRender={ isLinkControlVisible }
				onChange={ ( value ) => handleOnChange( { link: value } ) }
				richTextRef={ richTextRef }
				value={ link }
			/>
			<BlockControls group="other">
				<ToolbarGroup>
					<ToolbarButton icon={ linkIcon } isActive={ isLinkControlVisible } onClick={ setLinkControlVisible } title={ __( 'Edit link', 'sixa' ) } />
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}

Button.propTypes = {
	/**
	 * The CSS class name that will be appended to the wrapper div.
	 */
	className: PropTypes.string,
	/**
	 * Whether the LinkControl is set to be visible.
	 */
	isLinkControlVisible: PropTypes.bool,
	/**
	 * Whether the field is meant to be rendered on the front-end.
	 */
	isSave: PropTypes.bool,
	/**
	 * Callback function to be triggered when the value of the input change.
	 */
	onChange: PropTypes.func,
	/**
	 * Callback function to toggle the visibility of the link popover.
	 */
	setLinkControlVisible: PropTypes.func,
	/**
	 * Value of the control.
	 */
	value: PropTypes.string,
};

Button.defaultProps = {
	className: undefined,
	isLinkControlVisible: false,
	isSave: false,
	onChange: () => {},
	setLinkControlVisible: () => {},
	shouldRender: true,
	value: undefined,
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( Button );
