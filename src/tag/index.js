/**
 * Runtime type checking for React props and similar objects.
 *
 * @ignore
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 *
 * @ignore
 */
import classnames from 'classnames';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see		https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 * @ignore
 */
import { Button, VisuallyHidden } from '@wordpress/components';

/**
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @see		https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 * @ignore
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Retrieves the translation of text.
 *
 * @see		https://developer.wordpress.org/block-editor/packages/packages-i18n/
 * @ignore
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 */
import { formattedContent } from '@sixach/wp-block-utils';

/**
 * Tag element with a remove button.
 * This component is typically used as the output when iterating over a collection of items that should
 * be displayed as tags rather than standalone.
 *
 * @function
 * @since	   	1.2.0
 * 			   	Introduced type checking.
 * @since		1.1.0
 * @param		{Object}		props 						The props that were defined by the caller of this component.
 * @param		{string}		props.label 				Label shown in the element.
 * @param		{string}		props.className 			The class that will be added to the classes of the wrapper span.
 * @param		{string}		props.screenReaderText		Text to be used for screen readers.
 * @param		{Function}		props.onRemove 				Callback function to trigger when the remove button is clicked.
 * @return		{JSX.Element} 								Tag element.
 * @example
 *
 * <Tag
 * 		label={ label }
 * 		onRemove={ handleOnClickTag }
 * />
 */
function Tag( { label, className, screenReaderText, onRemove } ) {
	const instanceId = useInstanceId( Tag );

	return (
		<span id={ `sixa-component-tag-${ instanceId }` } className={ classnames( 'sixa-component-tag', className ) }>
			<VisuallyHidden as="span">{ screenReaderText || label }</VisuallyHidden>
			<span aria-hidden="true">{ formattedContent( label ) }</span>
			{ !! onRemove && (
				<Button
					isSmall
					className="sixa-component-tag__remove-button"
					variant="link"
					icon="remove"
					onClick={ onRemove }
					/* translators: Label of Tag that will be removed. */
					label={ sprintf( __( 'Remove %s', 'sixa' ), label ) }
				/>
			) }
		</span>
	);
}

Tag.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	screenReaderText: PropTypes.string,
	onRemove: PropTypes.func,
};

export default Tag;
