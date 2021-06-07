/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Button } from '@wordpress/components';

/**
 * Tag element with a remove button.
 *
 * @function
 * @since 1.0.0
 * @param 	{Object} 	props			The props that were defined by the caller of this component.
 * @param 	{string}	props.label		Label shown in the element.
 * @param 	{Function}	props.onRemove	Callback function when the remove button is clicked.
 * @param 	{string}	props.className	The class that will be added to the classes of the wrapper span.
 * @returns {JSX.Element}				Tag element.
 * @constructor
 */
function Tag({ label, onRemove, className }) {
	return (
		<span className={ className }>
			{ label }
			<Button variant="link" icon="remove" isSmall onClick={ onRemove } />
		</span>
	);
}

export default Tag;
