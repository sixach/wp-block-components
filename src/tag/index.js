/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Button, VisuallyHidden } from '@wordpress/components';

/**
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Import icons from the WordPress icon library.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/
 */
import { close } from '@wordpress/icons';

/**
 * Retrieves the translation of text.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import { Child, StyledTag } from './style';

/**
 * Tag element with a remove button.
 * This component is typically used as the output when iterating over a collection of items that should
 * be displayed as tags rather than standalone.
 *
 * @function
 * @since	   1.3.0
 * 			   Added default props.
 *  		   Indented 4 spacing.
 * @since	   1.2.0
 * 			   Introduced type checking.
 * @since	   1.1.0
 * @param	   {Object}			props 					  The props that were defined by the caller of this component.
 * @param	   {string}			props.label 			  Label shown in the element.
 * @param	   {string}			props.className 		  The class that will be added to the classes of the wrapper span.
 * @param	   {string}			props.screenReaderText    Text to be used for screen readers.
 * @param	   {Function}	    props.onRemove 			  Callback function to trigger when the remove button is clicked.
 * @return     {JSX.Element} 							  Tag element.
 * @example
 *
 * <Tag
 *     label={ label }
 *     onRemove={ handleOnClickTag }
 * />
 */
function Tag( { label, className, screenReaderText, onRemove } ) {
	const instanceId = useInstanceId( Tag );

	return (
		<StyledTag
			wrap
			align="center"
			direction="row"
			justify="flex-start"
			id={ `sixa-component-tag-${ instanceId }` }
			className={ classnames( 'sixa-component-tag', className ) }
			expanded={ false }
		>
			{ screenReaderText && <VisuallyHidden as="span">{ screenReaderText }</VisuallyHidden> }
			<Child aria-hidden="true">{ label }</Child>
			{ onRemove && (
				<Child>
					<Button
						isSmall
						isLink
						showTooltip
						iconSize={ 20 }
						icon={ close }
						onClick={ onRemove }
						/* translators: %s: Label of the tag element to be removed. */
						label={ sprintf( __( 'Remove %s', 'sixa' ), label ) }
					/>
				</Child>
			) }
		</StyledTag>
	);
}

Tag.propTypes = {
	/**
	 * Label shown before the spinner.
	 */
	label: PropTypes.string,
	/**
	 * The CSS class name that will be appended to the wrapper div.
	 */
	className: PropTypes.string,
	/**
	 * Label text to be used for screen readers.
	 */
	screenReaderText: PropTypes.string,
	/**
	 * Callback function to trigger when the remove button is clicked.
	 */
	onRemove: PropTypes.func,
};

Tag.defaultProps = {
	label: null,
	className: null,
	screenReaderText: null,
	onRemove: undefined,
};

export default Tag;
