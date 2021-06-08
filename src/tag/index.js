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
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Button } from '@wordpress/components';

/**
 * Tag element with a remove button.
 * This component is typically used as the output when iterating over a collection of items that should
 * be displayed as tags rather than standalone.
 *
 * @function
 * @since	1.0.0
 * @param	{Object} 	props				The props that were defined by the caller of this component.
 * @param	{string}	props.label			Label shown in the element.
 * @param	{Function}	props.onRemove		Callback function to trigger when the remove button is clicked.
 * @param	{string}	props.className		The class that will be added to the classes of the wrapper span.
 * @return	{JSX.Element}					Tag element.
 * @example
 *
 * const { label } = item;
 * <Tag
 * 		label={ label }
 * 		onRemove={ handleOnClickTag }
 * />
 */
function Tag( { label, onRemove, className } ) {
	return (
		<span className={ classnames( 'components-tag', className ) }>
			{ label }
			<Button variant="link" icon="remove" isSmall onClick={ onRemove } />
		</span>
	);
}

export default Tag;
