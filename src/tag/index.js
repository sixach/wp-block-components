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
 * @see		https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 * @ignore
 */
import { withInstanceId } from '@wordpress/compose';

/**
 * Utility for escaping HTML content.
 *
 * @see		https://developer.wordpress.org/block-editor/reference-guides/packages/packages-escape-html/
 * @ignore
 */
import { escapeHTML } from '@wordpress/escape-html';

/**
 * HTML entity utilities for WordPress.
 *
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/packages/html-entities/README.md
 * @ignore
 */
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Retrieves the translation of text.
 *
 * @see		https://developer.wordpress.org/block-editor/packages/packages-i18n/
 * @ignore
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Tag element with a remove button.
 * This component is typically used as the output when iterating over a collection of items that should
 * be displayed as tags rather than standalone.
 *
 * @function
 * @since		1.1.0
 * @param		{Object}		props 						The props that were defined by the caller of this component.
 * @param		{string}		props.label 				Label shown in the element.
 * @param		{number}		props.instanceId			Unique ID of the component.
 * @param		{Function}		props.onRemove 				Callback function to trigger when the remove button is clicked.
 * @param		{string}		props.screenReaderText		Text to be used for screen readers.
 * @param		{string}		props.className 			The class that will be added to the classes of the wrapper span.
 * @return		{JSX.Element} 								Tag element.
 * @example
 *
 * <Tag
 * 		label={ label }
 * 		onRemove={ handleOnClickTag }
 * />
 */
function Tag( { instanceId, label, onRemove, className, screenReaderText } ) {
	return (
		<span id={ `sixa-component-tag-${ instanceId }` } className={ classnames( 'sixa-component-tag', className ) }>
			<VisuallyHidden as="span">{ screenReaderText || label }</VisuallyHidden>
			<span aria-hidden="true">{ escapeHTML( decodeEntities( label ) ) }</span>
				{ !! onRemove && (
					<Button
						className="sixa-component-tag__remove-button"
						variant="link"
						icon="remove"
						isSmall
						onClick={ onRemove }
						/* translators: Label of Tag that will be removed. */
						label={ sprintf( __( 'Remove %s', 'sixa' ), label ) }
					/>
				) }
		</span>
	);
}

export default withInstanceId( Tag );
