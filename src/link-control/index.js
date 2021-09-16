/* eslint-disable @wordpress/no-unsafe-wp-apis */

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
import { useToggle } from '@sixa/wp-react-hooks';

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
import { BlockControls, __experimentalLinkControl } from '@wordpress/block-editor';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 */
import { ifCondition } from '@wordpress/compose';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Popover, ToolbarButton, ToolbarGroup } from '@wordpress/components';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { Fragment } from '@wordpress/element';

/**
 * Import icons from the WordPress icon library.
 *
 * @see    https://github.com/WordPress/gutenberg/blob/trunk/packages/icons/README.md
 */
import { link } from '@wordpress/icons';

/**
 * Renders a link control. A link control is a controlled input which maintains
 * a value associated with a link (HTML anchor element) and relevant settings
 * for how that link is expected to behave.
 *
 * @function
 * @since	   1.5.0
 * @param 	   {Object}  	    props                Component properties.
 * @param 	   {Object}  	    props.anchorRef      A mutable ref object of instance of the control being used.
 * @param	   {string}		    props.className 	 The CSS class name(s) that will be added to the component element.
 * @param 	   {Object} 	    props.isActive       Whether the current state of the button is active.
 * @param 	   {Function}  	    props.onChange 	     Function that receives the value of the input.
 * @param      {Function}       props.onClick        Callback function executed when a click on the button happens.
 * @param 	   {Object}  	    props.richTextRef    A mutable ref object of Button component.
 * @param 	   {Object}  	    props.value          Link object value for the button component.
 * @return     {JSX.Element}                    	 Link element to render.
 * @example
 *
 * <LinkControl
 *     anchorRef={ anchorRef }
 *	   className="wp-block-navigation-link__inline-link-input"
 *     isActive={ isLinkControlVisible }
 *	   shouldRender={ isLinkControlVisible }
 *     onClick={ setLinkControlVisible }
 *	   onChange={ ( value ) => handleOnChange( { link: value } ) }
 *	   richTextRef={ richTextRef }
 *     value={ link }
 * />
 */
function LinkControl( { anchorRef, className, isActive, onChange, onClick, richTextRef, value } ) {
	const [ isEditingURL, setIsEditingURL ] = useToggle( false );
	const handleOnClose = () => {
		setIsEditingURL( false );
		richTextRef.current?.focus();
	};
	const handleOnChange = ( newValue ) => {
		onChange( { ...value, ...newValue } );
	};
	const handleOnRemove = () => {
		onChange( { opensInNewTab: undefined, rel: 'noopener', url: '#' } );
		setIsEditingURL( false );
		richTextRef.current?.focus();
	};

	return (
		<Fragment>
			<Popover anchorRef={ anchorRef?.current } focusOnMount={ isEditingURL ? 'firstElement' : false } onClose={ handleOnClose } position="bottom center">
				<__experimentalLinkControl
					className={ classnames( 'wp-block-navigation-link__inline-link-input', className ) }
					forceIsEditingLink={ isEditingURL }
					onChange={ handleOnChange }
					onRemove={ handleOnRemove }
					value={ value }
				/>
			</Popover>
			<BlockControls group="other">
				<ToolbarGroup>
					<ToolbarButton icon={ link } isActive={ isActive } onClick={ onClick } title={ __( 'Edit link', 'sixa' ) } />
				</ToolbarGroup>
			</BlockControls>
		</Fragment>
	);
}

LinkControl.propTypes = {
	/**
	 * A mutable ref object.
	 */
	anchorRef: PropTypes.exact( {
		current: PropTypes.object,
	} ),
	/**
	 * The CSS class name that will be appended to the wrapper element.
	 */
	className: PropTypes.string,
	/**
	 * Whether the current state of the button is active.
	 */
	isActive: PropTypes.bool,
	/**
	 * Callback function to be triggered when the value of the input change.
	 */
	onChange: PropTypes.func,
	/**
	 * Callback function executed when a click on the button happens.
	 */
	onClick: PropTypes.func,
	/**
	 * A mutable ref object.
	 */
	richTextRef: PropTypes.exact( {
		current: PropTypes.object,
	} ),
	/**
	 * Link object value for the button component.
	 */
	value: PropTypes.shape( {
		opensInNewTab: PropTypes.bool,
		url: PropTypes.string,
		rel: PropTypes.string,
	} ),
};

LinkControl.defaultProps = {
	anchorRef: {},
	className: undefined,
	isActive: false,
	onChange: () => {},
	onClick: () => {},
	richTextRef: {},
	value: {},
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( LinkControl );
